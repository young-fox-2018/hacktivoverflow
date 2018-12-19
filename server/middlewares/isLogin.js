const jwtHelper = require('../helpers/jwtHelper')
const User = require('../models/User')

function isLogin(req,res,next){
    if(req.headers.token){
        let decoded = jwtHelper.decode(req.headers.token)
        
        User.findOne({
            _id : decoded.id
        })
            .then(user=> {
                if(user){
                    req.currentUser = decoded
                    next()
                } else {
                    res.status(400).json({errors: {auth: {message: 'token is expired or wrong'}}})
                }
            })
            .catch(err=> {
                res.status(400).json({errors: {auth: {message: err.message}}})
            })
    } else {
        res.status(400).json({
            errors: { auth: {message: 'Forbidden, token is needed'}}
        })
    }
}

module.exports = isLogin