const jwt = require('jsonwebtoken')
require('dotenv').config()


function generateJsonToken(user) {
    return jwt.sign(user, process.env.jwt_secret)
}

module.exports = generateJsonToken
