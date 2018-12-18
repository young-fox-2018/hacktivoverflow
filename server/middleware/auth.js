"use strict"

const jwt = require('../helpers/jwt')
const User = require('../models/User')

module.exports = {
    checkUser: (req, res, next) => {
     jwt.validateToken(req.headers.token, (err, decoded) => {
            if (err) {
              console.log(err)
                res.status(500).json( {
                    err: err
                })
            } else {
                User.findById(decoded._id, (err, user) => {
                    if (err) {
                      console.log(err, 'masuk ga')
                      res.status(500).json( {
                          err: err
                      })
                    } else {
                        if (user) {
                            req.user = user
                            next()
                        } else {
                            res.status(404).json( {
                                err:'User not found'
                            })
                        }
                    }
                })
            }
        })
    }
}