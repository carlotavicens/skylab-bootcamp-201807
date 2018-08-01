import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardColumns,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Form
} from "reactstrap";
import logic from "../logic";
import { List, AutoSizer } from "react-virtualized";

class Search extends Component {
  state = {
    query: "",
    data: "",
    detail: {}
  };

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSearch = (e) => {
    e.preventDefault()
    logic.getGamesByName(this.state.query).then(res => {
      this.setState({
        detail:{},
        data: res
      });
    });
  };

  getDetail = id => {
    console.log(id);
    logic.getStatsForGame(id).then(res => {
      console.log(res);
      this.setState({
        detail: res
      });
    });
  };

  renderRow = ({ index, isScrolling, key, style }) => {
    return (
      <div
        key={key}
        onClick={() => this.getDetail(this.state.data[index].id)}
        style={style}
      >
        <div>
          <img src={this.state.data[index].src} />
        </div>
        <div> {this.state.data[index].title}</div>
      </div>
    );
  };

  renderDetailRow = ({ index, isScrolling, key, style }) => {
    return (
      <div key={key} style={style}>
        <div>
          <p>{this.state.detail.name}</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Row
          className="justify-content-center align-items-center"
          style={{ height: 30 + "vh" }}
        >
          <Col md="4">
          <Form onSubmit={this.handleSearch} className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              name="query"
              className="form-control"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <Button type="submit"> Search </Button>
            </Form>
          </Col>
        </Row>
        <div className="container justify-content-between">
          <div className="row">
            <div className="col-6">
              <AutoSizer>
                {({ width, height }) => {
                  return (
                    <List
                      rowCount={this.state.data.length}
                      width={500}
                      height={500}
                      rowHeight={250}
                      rowRenderer={this.renderRow}
                    />
                  );
                }}
              </AutoSizer>
            </div>
            {/* <p>{this.state.detail.name}</p>
            <AutoSizer>
                {({ width, height }) => {
                    return (
                        <List
                        rowCount={1}
                        width={300}
                        height={300}
                        rowHeight={500}
                        rowRenderer={this.renderDetailRow}
                        />
                        );
                    }}
            </AutoSizer> */}
            {Object.keys(this.state.detail).length ? (
              <div className="col-6">
                <Card>
                  <CardBody>
                    <CardTitle>{this.state.detail.name}</CardTitle>
                    <CardSubtitle>{this.state.detail.developer}</CardSubtitle>
                    <CardText>{this.state.detail.price / 100}$</CardText>
                    <CardText>Tags: <ul>{Object.keys(this.state.detail.tags).map(i => <li>{i}</li>)}</ul>
                    <p>Languages available: <br/><li>{this.state.detail.languages}</li></p>
                    
                    
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
