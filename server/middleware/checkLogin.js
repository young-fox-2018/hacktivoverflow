const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkLogin(req, res, next) {
   let token = req.headers.token
   if (token) {
       let decoded = jwt.verify(token, process.env.jwt_secret)
       User
           .findOne({ email: decoded.email })
           .then(function (user) {
               if (user) {
                   req.currentUser = user
                   next()
               } else {
                   res.status(400).json(`Please login first!`)
               }
           })
           .catch(function (err) {
               res.status(400).json(err.message)
           })
   }
}

module.exports = checkLogin