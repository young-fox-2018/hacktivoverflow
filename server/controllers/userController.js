const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {compareCrypt} = require('../helpers/bcrypt')
const axios = require('axios')
const generator = require('generate-password');
const kue = require('kue')
const queue = kue.createQueue();
const nodemailer = require('nodemailer');
require('dotenv').config()

class UserController {
    static register(req, res) {
        let user = new User({
            name:  req.body.name,
            email: req.body.email,
            password: req.body.password,
            loginSource: "manual"
        })
        user.save()
        .then(result => {
            let job = queue.create('email', {
                title: 'Registration Notification from Hacktiv-Overflow Forum'
                , to: `${result.email}`
                , template: 'Welcome to Hackti-Overflow Forum!'
            }).save( function(err){
                if( !err ) console.log('background job id: ', job.id );
            });

            res.status(200).json(result)
                
        })
        .catch(err => {
            res.status(400).json(err.errors.email)
        })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                res.status(400).json({message: "user not found, please register first"})
            } else {
                if(user.loginSource != "manual") {
                    res.status(400).json({message: `previously you register with ${user.loginSource}, please login with ${user.loginSource}`})
                }else{
                    if (compareCrypt(req.body.password, user.password)){
                        let token = jwt.sign({ id: user._id }, process.env.userSecretJWT);
                        res.status(200).json(token)
                    } else {
                        res.status(400).json({message: "email or password is incorrect"})
                    }                
                }
            }
        })
        .catch((err) => {
            res.status(400).json(err.message)
        })
    }

    static loginFB(req, res) {
        axios({
            method: 'GET',
            url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&&access_token=${req.body.accessToken}`
        })
        .then(function (response) {
            User.findOne({
                email: response.data.email
            })
            .then((user) => {                        
                if (!user) {
                    let user = new User({
                        name: response.data.name,
                        email: response.data.email,
                        password: generator.generate({
                            length: 10
                        }),
                        loginSource: "facebook"
                    })
                    user.save()
                    .then(result => {
                        let token = jwt.sign({ id: result._id }, process.env.userSecretJWT);
                        res.status(200).json(token)
                    })
                    .catch(err => {
                        console.log("masuk catch")
                        res.status(400).json(err.message)
                    })        
                }else {
                    if(user.loginSource != "facebook") {
                        res.status(400).json({message: `previously you register ${user.loginSource}, please login with ${user.loginSource}`})
                    } else {                                
                        let token = jwt.sign({ id: user._id }, process.env.userSecretJWT);
                        res.status(200).json(token)            
                    }
                }
            })
            .catch((err) => {
                res.status(400).json(err.message)
            })
        })
        .catch(function (err) {
            res.status(400).json(err.message)
        });
    }
}

module.exports = UserController