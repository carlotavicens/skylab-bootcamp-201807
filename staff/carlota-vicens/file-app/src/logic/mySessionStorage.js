const sessionStorage = {
    _data: {},
    setItem(name, value) {
        this._data[name] = value
    },
    getItem(name) {
        return this._data[name]

    },
    clear() {
        this._data = {}
    }
}


module.exports = sessionStorage