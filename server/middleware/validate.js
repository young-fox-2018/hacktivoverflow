const jwt = require('jsonwebtoken');
const User = require("../models/user")


module.exports = {
    isLogin: (req, res, next) => {
        console.log(req.headers);
        jwt.verify(req.headers.token, process.env.ENV_TOKEN, function (err, decoded) {

            if (err) {
                res.status(200).json({
                    msg: "not valid"
                })
            }
            else {
                User.findOne({ email: decoded.data.email })
                    .then((user) => {
                        let data = {
                            _id: user._id,
                            email: user.email,
                            first_name: user.first_name
                        }
                        req.decoded = data
                        next()
                    }).catch((err) => {
                        res.status(200).json({
                            msg: "not valid"
                        })
                    });
            }
        })
    },
    isSelf: (req, res, next) => {

        jwt.verify(req.headers.token, process.env.ENV_TOKEN, function (err, decoded) {
            if (err) {
                res.status(404).json({
                    msg: "forbiden access"
                })
            }
            else {
                if (decoded.data.email === req.decoded.email) {
                    req.decoded = req.decoded
                    next()
                }
                else {
                    res.status(400).json({
                        msg: "for biden acces"
                    })
                }
            }
        });
    }
}