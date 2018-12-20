const chai      = require('chai')
const chaiHttp  = require('chai-http')
chai.use(chaiHttp)
const expect    = chai.expect
const app       = require('../app')
const clearUsers = require('../helpers/clearUsers');

after(function(done) {
    clearUsers(done)
});

describe('POST /signUp', function(){
    it('should register a new user to database, Status Code: 200', function(done){
        const userData = {
            username: "test dummy",
            email: 'test@test.com',
            password: 'test'
        }
        chai
        .request(app)
        .post('/signUp')
        .send(userData)
        .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            done()
        })
    })
    it('Input cannot be empty', function(done){
        const userData = {
            name: "test dummy",
            email: "",
            password:"emailKosong"
        }
        chai
        .request(app)
        .post('/signIn')
        .send(userData)
        .end( function(err, res){
            expect(res).to.have.status(500)
            expect(res.body.msg).to.equal("Input(s) cannot be empty")
            done()
        })
    })
    it('should return an Error because email has been used, Status Code: 400', function(done){
        const userData = {
            username: "test dummy",
            email: 'test@test.com',
            password: 'test'
        }
        chai
        .request(app)
        .post('/signUp')
        .send(userData)
        .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body.msg).to.equals("Email has been used")
            done()
        })
    })
})

describe('POST /signIn', function(){
    it('should signed in the user and return token, Status Code: 200', function(done){
        const userData = {
            email: 'test@test.com',
            password: 'test'
        }
        chai
        .request(app)
        .post('/signIn')
        .send(userData)
        .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object') //object with message and details containing the token
            expect(res.body).to.have.property('details')
            expect(res.body.details).to.be.an('object') 
            expect(res.body.details.token).to.be.a('string') // The Token
            expect(res.body.details.userId).to.be.a('string') // userID
            done()
        })
    })
    it('Input cannot be empty', function(done){
        const userData = {
            email:"testPassKosong@mail.com",
            password:""
        }
        chai
        .request(app)
        .post('/signIn')
        .send(userData)
        .end( function(err, res){
            expect(res).to.have.status(500)
            expect(res.body.msg).to.equal("Input(s) cannot be empty")
            done()
        })
    })
    it('Should return error if password is wrong', function(done){
        const userData = {
            email:"test@test.com",
            password:"1test"
        }
        chai
        .request(app)
        .post('/signIn')
        .send(userData)
        .end( function(err, res){
            expect(res).to.have.status(500)
            expect(res.body.msg).to.be.a('string')
            expect(res.body.msg).to.equals("Password is incorrect")
            done()
        })
    })
    it('Should return error if password/email is wrong', function(done){
        const userData = {
            email:"test@tes.com",
            password:"test"
        }
        chai
        .request(app)
        .post('/signIn')
        .send(userData)
        .end( function(err, res){
            expect(res).to.have.status(500)
            expect(res.body.msg).to.be.a('string')
            expect(res.body.msg).to.equals("User not found")
            done()
        })
    })
})