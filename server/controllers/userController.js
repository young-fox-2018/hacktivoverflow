const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    static create (req, res) {
        User
            .create({
              name : req.body.name,
              email: req.body.email,
              password: req.body.password,
              popularity: 0
            })
            .then(data => {
              res.status(201).json({
                message : "user created"
              })
            })
            .catch(err => {
              console.log(err)
              res.status(400).json(err)
            })
    }

    static getTopUser(req, res) {
        User.find({}, { password: 0, email: 0, __v: 0 })
            .then((users) => {
                users = users.sort(function(a, b) {
                    return b.popularity - a.popularity
                }).slice(0, 5)
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    
    static login (req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function(user) {
                if (user) {
                    const result = bcryptjs.compareSync(req.body.password, user.password);
                    if (result) {
                        const token = jwt.sign({id: user._id, name: user.name, email: user.email},
                        process.env.JWT_TOKEN);
                        res.status(201).json({token: token, name:user.name});
                    } else {
                        const err = {
                            message: 'Wrong username or password'
                        };
                        res.status(400).json(err);
                    }
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static loginGoogle (req, res) {
        // User
        //     .findOne({
        //         email: req.decoded.email,
        //         isGoogle: true
        //     })
        //     .then(function(user) {
        //         // if (user) {
        //         //     const result = bcryptjs.compareSync(req.body.password, user.password);
        //         //     if (result) {
        //         //         const token = jwt.sign({id: user._id, name: user.name, email: user.email},
        //         //         process.env.JWT_TOKEN);
        //         //         res.status(201).json({token: token, name:user.name});
        //         //     } else {
        //         //         const err = {
        //         //             message: 'Wrong username or password'
        //         //         };
        //         //         res.status(400).json(err);
        //         //     }
        //         // } else {
        //         //     const err = {
        //         //         message: 'Wrong username or password'
        //         //     };
        //         //     res.status(400).json(err);
        //         // }
        //         res.status(200).json(user)
        //     })
        //     .catch(function(err) {
        //         res.status(500).json(err);
        //     });
        res.status(200).json(req.decoded)
    }

    static googleRegister(req, res) {
        User.findOne({
            email: req.decoded.email
        })
        .then((result) => {
            // if(!result){
            //     User.create({
            //         email: req.decoded.email,
            //         name: req.decoded.name,
            //         password: process.env.GOOGLE_USER_PASSWORD,
            //         isGoogle: true
            //     })
            //     .then((result) => {
            //         next()
            //     })
            //     .catch((err) => {
            //         res.status(500).json({err: err})
            //     });
            // } else {
            //     next()
            // }
            if(!result) {
                // User
                //     .create({
                //         email: req.decoded.email
                //     })
                User
                    .create({
                        email: req.decoded.email,
                        name: req.decoded.username,
                        password: process.env.GOOGLE_USER_PASSWORD,
                        isGoogle: true
                    })
                    .then(data=> {
                        res.status(200).json({
                            msg : 'user created',
                            data: data
                        })
                    })
                    .catch(err=> {
                        res.status(500).json(err)
                    })
            } else {
                const token = jwt.sign({id: result._id, name: result.name, email: result.email},process.env.JWT_TOKEN);
                res.status(200).json({token: token, name:result.name})
            }
        })
        .catch((err) => {
            res.status(500).json({err: err})
        });
        
    }
}

module.exports = UserController