const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    verToken: function(req, res, next){
      if(req.headers.token){
        let data = jwt.verify(req.headers.token, process.env.SECRET)
        User.findById(data.id,function(err, user){
            if(err){
              res.status(500).json({
                  msg:"Error di Verify Token",
                  details: err.message
              })
            }
            else{
              if(user){
                  req.username = user.username
                  req.userEmail = user.email
                  req.userId = user.id
                  next()
              }
              else{
                res.status(500).json({
                    msg: "User is not found"
                })
              }
            }
        })
      }
      else{
        res.status(403).json({
          msg: "Please login"
        })
      }
    }
}