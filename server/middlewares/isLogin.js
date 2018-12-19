const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

function isLogin(req,res,next){
  console.log('masuk authentication')
  let token = req.headers.authorization
  console.log(token)
  jwt.verify(token,process.env.SECRET, function(error, decoded){
    if(error){ //tidak bisa verify jwt (token yg dikirim null)
      res.status(400).send({error, message: 'please login'})
    } else {
      User.findOne({
        email: decoded.email
      })
      .then(user => {
        if(user){
          console.log('user found')
          req.current_token = user
          // console.log('currentToken', req.current_token)
          next()
        } else {
          console.log('user not found')
          res.status(400).send({error, message: 'user not found, please login'})  
        }
        
      })
      .catch( error =>{
        // console.log(error)
        res.status(400).send({error, message: error.message})
      })
    }
  })
}

module.exports = isLogin