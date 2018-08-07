var http = require('http');
var url = require('url');

var port = process.argv[2]

var server = http.createServer((req, res) => {
    endpoint = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query.iso;
    var d = new Date(query)
    var response = {};
    if (endpoint === '/api/parsetime') {

        response = { hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds() }


    } else if (endpoint === '/api/unixtime') {
        response = { unixtime: d.getTime() }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })

    response = JSON.stringify(response)
    res.end(response);

})
server.listen(port);

/* 
var http = require('http')
    var url = require('url')

    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }

    function unixtime (time) {
      return { unixtime: time.getTime() }
    }

    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result

      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
    */