const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

function isLoggedIn(req, res, next) {
    if (req.headers.accesstoken) {
        jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded) {
                User.findOne({ 
                    email: decoded.email 
                })
                .then(user => {
                    if (user) {
                        req.userID = user._id
                        req.email = user.email
                        next()
                    }
                    else {
                        res.status(400).json({ 
                            message: 'you are not a registered user' 
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({ 
                        err: err.message,
                        message: 'error from find one user' 
                    })
                })
            }
            else {
                res.status(400).json({ 
                    message: 'You must login first' 
                })
            }
        })
    }
    else {
        res.status(401).json({ 
            message: 'You are not authorized to access this feature. Please login first' 
        })
    }
}

module.exports = isLoggedIn