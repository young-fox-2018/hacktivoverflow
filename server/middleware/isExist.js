const decode = require('../helpers/decode.js')
const User = require('../models/user.js')

function isExist(req, res, next) {
    //decode the token from header
    decode(req.headers.token)
        .then((decoded) => {
            //check if user still exist
            User
                .findOne(
                    {
                        email: decoded.email
                    }
                )
                .then((data) => {
                    if(data) {
                        req.user = data
                        next()
                    } else {
                        res.status(400).json({ message: "Invalid user" })
                    }
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
}

module.exports = isExist