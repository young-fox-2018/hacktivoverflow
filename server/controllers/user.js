const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const kue = require('kue')
const que = kue.createQueue()


class Controller {
    static getTop(req,res){
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
        console.log(req.body)
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

module.exports = Controller