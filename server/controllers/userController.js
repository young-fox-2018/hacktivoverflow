const User = require('../models/user')
const crypter = require('../helper/tokenGenerator')

module.exports = {
    oneUser: function (req, res, next) {
        var decoded = jwt.decode(req.headers.token)
        User.findById({
            _id: decoded._id
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    update: function (req, res, next) {
        let token = req.headers.token
        let decoded = jwt.decode(token)
        let update = req.body
        User.findByIdAndUpdate({
            _id: decoded._id  
        }, update)
            .then(updatedUser => {
                res.status(200).json({
                    msg: 'update success'
                })
            })
            .catch(err => {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    delete: function (req, res, next) {
        let token = req.headers.token
        let decoded = jwt.decode(token)
        User.findByIdAndDelete({
                _id: decoded._id
            })
            .then(success => {
                res.status(200).json({
                    msg: 'your account has been deleted'
                })
            })
            .catch(err => {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    signUp: function (req, res, next) {
        let newUser = req.body
        User.create(newUser)
            .then(function (user) {
                console.log(user)
                let token = crypter({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email
                })
                res.status(201).json(token)
            })
            .catch(function (err) {
                console.log(err)
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    signIn: function (req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(function (loggedUser) {
                let password = req.body.password
                if (bcrypt.compareSync(password, loggedUser.password)) {
                    let token = crypter({
                        _id: loggedUser._id,
                        fullName: loggedUser.lastName,
                        email: loggedUser.email
                    })
                    res.status(200).json({
                        token: token
                    })
                } else {
                    res.status(400).json('Wrong password')
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json('Email not found, please register first')
            })
    }
}