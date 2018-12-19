const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const kue = require('kue')
const que = kue.createQueue()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.Client_id);


class Controller {
    static getTop(req, res) {
        userModel.find({}).sort('-reputation')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    static checkLogin(req, res) {
        res.status(200).json({
            avatar: req.user.avatar,
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        })
    }
    static register(req, res) {
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file.cloudStoragePublicUrl,
            reputation: 0
        })
            .then(data => {
                que.create('email', {
                    title: 'welcome email',
                    email: data.email,
                    template: `<p>welcome to hackitve overflow !!, thanks for register on our site </p>`
                }).save(function (err) {
                    if (err) {
                        Console.log(err)
                    }
                })
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static login(req, res) {
        //INI BUAT GOOGLE SIGN
        if (req.body.token !== undefined) {
            client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.Client_id
            }, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('masuk sini --------====-=')
                    var result = data.getPayload()
                    userModel.findOne({
                        email: result.email
                    })
                        .then(data => {
                            if (data == null) {
                                return new Promise(function (resolve, reject) {
                                    userModel.create({
                                        name: result.name,
                                        email: result.email,
                                        password: '12345',
                                        avatar: result.picture,
                                        reputation: 0
                                    })
                                        .then(data => {
                                            que.create('email', {
                                                title: 'Welcome email, registered from google',
                                                email: data.email,
                                                template: `<p>welcome to hackitve overflow !!, thanks for register on our site. you can sign in using your email and the default password is <strong>12345</strong> </p>`
                                            }).save(function (err) {
                                                if (err) {
                                                    Console.log(err)
                                                } else {
                                                    console.log('masuk sini')
                                                    let token = jwt.sign(JSON.stringify(data), process.env.JWT_SECRET)
                                                    res.status(201).json({ token })
                                                    resolve(data)
                                                }
                                            })

                                        })
                                        .catch(err => {
                                            res.status(400).json(err)
                                            reject(err)
                                        })
                                })
                            } else {
                                let token = jwt.sign(JSON.stringify(data), process.env.JWT_SECRET)
                                res.json({ token })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json(err)
                        })
                }
            })
        }
        else {

            userModel.findOne({
                email: req.body.email
            })
                .then(data => {
                    if (data == null) {
                        res.status(400).json({
                            msg: 'invalid email'
                        })
                    } else {
                        let status = bcrypt.compareSync(req.body.password, data.password)
                        if (status == false) {
                            res.status(400).json({
                                msg: 'invalid password'
                            })
                        } else {
                            res.json({
                                token: jwt.sign(JSON.stringify({
                                    name: data.name,
                                    _id: data._id,
                                    email: data.email,
                                    avatar: data.avatar
                                }), process.env.JWT_SECRET)
                            })
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'internal server eror'
                    })
                })
        }

    }
}

module.exports = Controller