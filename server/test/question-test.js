const chai      = require('chai')
const chaiHttp  = require('chai-http')
chai.use(chaiHttp)
const expect    = chai.expect
const app       = require('../app')
const clearQuestions = require('../helpers/clearQuestions');


before(function(done){
    
})


after(function(done) {
    clearQuestions(done)
});