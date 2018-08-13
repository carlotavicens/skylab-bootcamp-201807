'use strict'

const logic = require('.')
const { expect } = require('chai')
const fs = require('fs')



describe('logic (files-app)', () => {
    let username, password

    beforeEach(() => {
        username = 'c' + Math.random(), password = '123'
    })

    describe('user\'s', () => {
        
                describe('register user', () => {
                    it('should register on correct data', () => {
                        return logic.registerUser(username, password)
                            .then(res =>  {
                                expect(res).to.be.true
                                expect(logic.loggedIn).to.be.false
                                expect(logic._userUsername).to.be.undefined
                                expect(logic._userPassword).to.be.undefined
                            })
        
                    })
        
                })
        
                describe('authenticate user', () => {
                    it('should authenticate on correct data', () => {
                        return logic.registerUser(username, password)
                            .then(() => logic.authenticateUser(username, password))
                            .then(res => {
                                expect(res).to.be.true
                                expect(logic._userUsername).to.equal(username)
                                expect(logic._userPassword).to.equal(password)
                                expect(logic.loggedIn).to.be.true
                            })
        
                    })
                })
        
        
                describe('logout', () => {
                    it ('should logout', () => {
                        return logic.registerUser(username, password)
                        .then (logic.authenticateUser (username, password))
                        .then (() => logic.logout())
                        .then (res => {
                            expect(res).to.be.true
                            expect(logic._userUsername).to.be.undefined
                            expect(logic._userPassword).to.be.undefined
                            expect(logic.loggedIn).to.be.false
                        })
                    })
                })
        
        describe('upload files', () => {
            it('should upload a file', () => {
                return logic.registerUser(username, password)
                    .then(() => logic.authenticateUser(username, password))
                    .then(() => {
                        return logic.uploadFiles(fs.createReadStream('./README.md'))
                    })
                    .then(res => expect(res).to.be.true)
            })
        })



    })
})
