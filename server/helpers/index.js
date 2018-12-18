const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')

module.exports = {
    hashPass : function(params){
        return bcrypt.hashSync(params, salt)
    },
    compare : function(params1, params2){
        return bcrypt.compareSync(params1, params2)
    },
    signJwt  : function(params){
        return jwt.sign(params, process.env.secret)
    },
    verifyToken : function(token){
        return jwt.verify(token, process.env.secret)
    }
}