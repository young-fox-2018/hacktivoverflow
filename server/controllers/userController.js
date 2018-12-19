const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require('../helpers/token')
const kue = require('kue')
const queue = kue.createQueue()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
require("dotenv").config()

module.exports = {
    user_register: (req, res) => {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
            .then((user) => {
                queue.create('email', {
                    title: `Welcome To SULISTYO-GROUP-TECH!`,
                    email: user.email,
                    template: `<h1> Welcome ${user.email}, Thanks for Register to our website!</h1>`
                })
                    .save((err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(user);
                        }
                    })
                res.status(201).json(user)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    },
    user_login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {
                let isTrue = bcrypt.compareSync(req.body.password, user.password)
                if (isTrue) {
                    let data = {
                        _id: user._id,
                        email: user.email,
                        first_name: user.first_name
                    }
                    const token = jwt(data)
                    res.status(200).json({ token: token, data: data })
                }
                else {
                    res.status(400).json({
                        msg: "not match"
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    msg: "not match"
                })
            });
    },
    glogin: (req, res) => {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.gtoken,
                audience: process.env.CLIENT_ID
            });
            let payload = ticket.getPayload()
            User.findOne({ email: payload.email })
                .then((user) => {
                    let data = {
                        _id: user._id,
                        email: user.email,
                        first_name: user.first_name
                    }
                    const token = jwt(data)
                    res.status(200).json({ token: token, data: data })

                }).catch((err) => {

                });


        }
        verify().catch(console.error);
    },
    isLogin(req, res) {
        res.status(200).json({
            user: req.decoded
        })
    },

    update_user: (req, res) => {
        let newArticle = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        User.updateOne({ _id: req.params.id }, newArticle)
            .then((result) => {
                res.status(201).json(
                    result
                )
            }).catch((err) => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            });
    }


}