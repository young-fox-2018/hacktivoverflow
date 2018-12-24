const User = require('../models/user')
const bcrypt = require('bcryptjs')
const tokenGenerator = require('../helpers/tokenGenerator')
const kue = require('kue')
const queue = kue.createQueue()

module.exports = {
    register(req, res, next) {
        console.log('masuk register')
        let newUser = {
            name: req.body.name,
            birthday: req.body.birthday,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(newUserData => {
                queue.create('email', {
                    title: 'Welcome To Hacktiv Overflow',
                    email: newUserData.email,
                    template: '<h2>Welcome to Hacktiv Overflow</h2>'
                })
                .save(function(err) {
                    if (err) console.log(err)
                })
                res.status(201).json({msg: 'Register success', newUserData})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    login (req, res, next) {
        console.log('masuk login')
        if (req.gLogin) {
            console.log('masuk glogin')
            User.findOne({email: req.gLogin.email})
                .then(user => {
                    if (!user) {
                        let token = tokenGenerator.generate({name: `${req.gLogin.name}`, email: req.gLogin.email})
                        res.status(200).json(token)
                        console.log(req.gLogin)
                        let newGoogleUser = {
                            name: req.gLogin.name,
                            email: req.gLogin.email,
                            password: `${req.gLogin.given_name}123`
                        }
                        User.create(newGoogleUser)
                        .then(newUser => {
                            res.status(201).json({msg: 'Register success', newUser})
                        })
                        .catch(err => {
                            res.status(400).json(err.message)
                        })
                    }
                    else {
                        let token = tokenGenerator.generate({name: `${req.gLogin.name}`, email: req.gLogin.email})
                        res.status(200).json(token)
                    }
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
        }
        else {
            if (bcrypt.compareSync(req.body.password, req.login.password)) {
                let token = tokenGenerator.generate({id: req.login._id, name: req.login.name, birthday: req.login.birthday, email: req.login.email})
                res.status(200).json(token)
            }
            else {
                res.status(400).json({msg: 'Incorrect password'})
            }
        }
    },

    findOne(req, res, next) {
        console.log('masuk findOne')
        User.findOne({_id: req.currentUser._id})
            .then(user => { 
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}