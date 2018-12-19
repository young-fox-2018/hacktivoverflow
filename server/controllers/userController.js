const User = require('../models/user')
const getJWTtoken = require('../helpers/JWTtoken')
const bcryptCompare = require('../helpers/bcryptCompare') 
ObjectId = require('mongodb').ObjectID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config()

class UserController {
    static allUsers(req, res) {
        User.find({})
        .then( users => {
            res.status(200).json({
                users: users
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from readAll users'
            })
        })
    }

    static register(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            birthday: req.body.birthday
        })
        .then( user => {
            res.status(201).json({
                user: user,
                message: 'Congratulation! You have been registered! Please login to continue.'
            })
        })
        .catch( err => {
            res.status(500).json({ 
                err: err.message,
                message: 'error from creating new user'
            })
        })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then( user => {
            if (user) {
                let result = bcryptCompare(req.body.password, user.password)
                if (result === true) {
                    let accesstoken = getJWTtoken({
                        email: user.email
                    })
                    res.status(200).json({
                        accesstoken: accesstoken,
                        email: user.email
                    })
                }
                else {
                    res.status(400).json({
                        message: 'invalid password'
                    })
                }
            }
            else {
                res.status(400).json({
                    message: 'email is not yet registered. Please register first.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err.message, 
                message: "error from login"
            })
        })
    }

    static getTopUsers(req, res) {
        let limitUser = 5
        User.find({})
        .sort({
            point: -1
        })
        .limit(limitUser)
        .then( users => {
            res.status(200).json({
                users: users
            })
        })
        .catch( err => {
            res.status(200).json({
                err: err.message,
                message: 'error from getTopUsers'
            })
        })
    }

    static googleLogin(req, res) {
        var googleToken = req.body.googleToken
        return new Promise((resolve, reject) => {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, function (err, data) {
                if(err) {
                    reject(err)
                } else {
                    const payload = data.getPayload();
                    const userid = payload['sub'];
                    resolve(payload);
                }
            })
        })
        .then(payload => {
            let user = {
                email: payload.email,
                name: payload.name
            }

            User.findOne({
                email: user.email
            })
            .then((result) => {
                if(!result) {
                    User.create({
                        email: user.email,
                        name: user.name,
                        password: "password",
                        googleLogin: true
                    })
                    .then(user => {
                        res.status(200).json({
                            message : 'user created',
                            user: user
                        })
                    })
                    .catch(err=> {
                        res.status(500).json({
                            err: err.message,
                            message: 'error from user create - google Login'
                        })
                    })
                } else {
                    let accesstoken = getJWTtoken({
                        email: result.email
                    })
                    res.status(200).json({
                        accesstoken: accesstoken,
                        email: result.email
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from findOne user'
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err.message,
                message: 'error from google Login'
            })
        })

    }
}

module.exports = UserController