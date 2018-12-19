const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    loginCheck(req, res, next) {
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        User.findOne({email: decoded.email})
            .then(user => {
                if (user) {
                    req.currentUser = user
                    next()
                }
                else {
                    res.status(400).json({msg: 'Please login first'})
                }
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}