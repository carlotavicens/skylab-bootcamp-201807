const URL = 'http://localhost:8080'
const fetch = require('node-fetch')
const sessionStorage = require('./mySessionStorage')
var FormData = require('form-data');

const logic = {

    set _userUsername(userUsername) {
        sessionStorage.setItem('userUsername', userUsername)
    },

    get _userUsername() {
        return sessionStorage.getItem('userUsername')
    },

    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

    _callApi(path, method = 'get', body, stringify = true) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet) {
            config.headers = {}

            if (methodNotGet) {
                if (stringify) {
                    config.headers['content-type'] = 'application/json'

                } else {
                    delete config.headers['Content-Type']
                    //config.headers['content-type'] = 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
                }
            }
        }

        if (body) {
            if (stringify)
                config.body = JSON.stringify(body)
            else
                config.body = body
        }
        debugger

        return fetch(URL + path, config)

            .then(res => res.json())

    },


    registerUser(username, password) {
        return this._callApi('/register', 'post', { username, password })
            .then(res => {
                console.log(res)
                return true
            })
    },

    authenticateUser(username, password) {
        return this._callApi('/authenticate', 'post', { username, password })
            .then(res => {
                console.log(res)
                this._userUsername = username
                this._userPassword = password
                return true
            })
            .catch(error => console.error(error.message))
    },

    get loggedIn() {
        return !!this._userUsername
    },

    logout() {
        sessionStorage.clear()
        return true
    },

    uploadFiles(file) {
        let formData = new FormData()
        formData.append('upload', file)


        return this._callApi(`/user/${this._userUsername}/files`, 'post', formData, false)
            .then(res => {
                console.log(res)
                return true
            })
            .catch(console.log)

    }




}



module.exports = logic