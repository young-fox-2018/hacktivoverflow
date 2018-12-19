const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/generateJsonWebToken')
const kue = require('kue')
const queue = kue.createQueue()
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GClientId);



module.exports = {
    signUp: function (req, res) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            avatar: req.file.cloudStoragePublicUrl
        }
        User
            .create(newUser)
            .then((user) => {
                queue.create('email', {
                    title: `Welcome To Hacktivoverflow8!`,
                    email: user.email,
                    template:`<h1> Welcome ${user.email}, Thanks for Register to our website!</h1>`
                })
                .save((err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('masuk')
                    }
                })
                res.status(201).json(user)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    },
    signIn: function(req, res) {
        async function verify () {
            if(req.body.googleToken) {
                const ticket = await client.verifyIdToken({
                    idToken: req.body.googleToken,
                    audience: process.env.GClientId
                });
                const payload = ticket.getPayload();
                User
                .findOne({ email: payload.email })
                .then((googleUser) => {
                   if(googleUser) {
                       let token = generateToken({
                          name: googleUser.name,
                          email: googleUser.email
                       })
                       res.status(200).json({
                           _id: googleUser._id,
                           token: token,
                           name: googleUser.name,
                           email: googleUser.email,
                           avatar: googleUser.avatar
                       })
                   } else {
                       
                   }
                })
                .catch((err) => {
                    res.status(500).json({
                        msg: `Wrong email!`
                    })
                })
            }
            else {
                User
                .findOne({ email:req.body.email })
                .then((userLogin) => {
                    if(userLogin){
                        if(bcrypt.compareSync(req.body.password, userLogin.password)){
                            let token = generateToken({
                                name: userLogin.name,
                                email: userLogin.email
                            })
                            res.status(200).json({
                                _id: userLogin._id,
                                token: token,
                                name: userLogin.name,
                                email: userLogin.email,
                                avatar: userLogin.avatar
                            })
                        } else {
                            res.status(400).json({
                                msg:`Wrong password`
                            })
                        }
                    } else {
                        console.log('masuk')
                            res.status(400).json({
                                msg: `Wrong email`
                            })
                        }
                    })
                .catch((err) => {
                    res.status(500).json(err.message)
                }) 
            }
        }
        verify().catch(console.error);
    }
}