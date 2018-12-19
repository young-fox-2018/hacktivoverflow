const Helper = require('../helper/index')
const User = require('../models/user')

function checkAuthentication ( req, res, next ) {
    console.log(`===========masuk authentication==========`)
    console.log(req.headers)
    let decode = Helper.decodeJws( req.headers.jtoken )
    User.findById(decode.id)
    .then( user => {
        if ( user ) {
            req.myId = decode.id
            next()
        } else {
            res.status(500).json("error, please contact developer!")
        }  
    })
    .catch( err => {
        console.log( err )
    })  
}

module.exports = checkAuthentication