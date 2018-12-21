const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const kue = require('kue')
const queue = kue.createQueue()
const nodemailer = require('nodemailer');
const axios = require('axios')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gamecowo12345@gmail.com',
    pass: 'gamecowo54321'
  }
});

queue.process('welcomeEmail', function (job, done){
    let input = {
        to: job.data.to,
        from: 'gamecowo12345@gmail.com',
        subject: 'Welcome to Overflow AHE',
        text: 'Enjoy your time here!'
    }
    
    transporter.sendMail(input, function(error, info){
        if (error) {
            console.log(error, "error didalam transporter nodemamiler")
            done({msg: error})
        } else {
            console.log('Email sent: ' + info.response);
            done()
        }
    })
})

module.exports = {
    signUp: function(req, res, next){
        let input = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        if(!req.body.password || !req.body.email || !req.body.username){
            res.status(500).json({
                msg:"Input(s) cannot be empty"
            })
        }
        else{
          User.findOne({email: req.body.email}, function(err, user){
            if(err){
                res.status(500).json({
                    msg: "Errornya di confirmation unique email signUp",
                    details: err.message
                })
            }
            else{
                if(user){
                    res.status(400).json({
                        msg: "Email has been used"
                    })
                } else {
                    User.create(input, function(err, user){
                        if(err){
                            res.status(500).json({
                                msg: "Errornya di signUp",
                                details: err.message
                            })
                        }
                        else{
                            var job = queue.create('welcomeEmail', {
                               to: user.email,
                            }).save( function(err){
                               if( !err ) console.log( job.id );
                            });
                            res.status(200).json({
                                msg: "User successfully registered",
                                details: user
                            })
                        }
                    })
                }
            }
          })
        }
    },
    signIn: function(req, res, next){
        if(!req.body.password || !req.body.email){
            res.status(500).json({
                msg:"Input(s) cannot be empty"
            })
        }
        else{
            User.findOne({email: req.body.email}, function(err, user){
                if(err){
                    res.status(500).json({
                        msg: "Errornya di signIn",
                        details: err.message
                    })
                }
                else{
                    if(user){
                        if(bcrypt.compareSync(req.body.password, user.password)){
                            let token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                msg: "User successfully logged in",
                                details: {token: token, userId: user._id, username: user.username}
                            })
                        }
                        else{
                            res.status(500).json({
                                msg: "Password is incorrect"
                            })
                        }
                    }
                    else{
                        res.status(500).json({
                            msg: "User not found"
                        })
                    }
                }
            })
        }
    },
    gSignIn: function(req, res, next){
        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.token}`)
        .then(response => {
            if(response.data.email_verified){
                User.findOne({email: response.data.email}, function (err, user){
                    if(err){
                        res.status(500).json({
                            msg: "Errornya di gSignIn",
                            details: err.message
                        })
                    }
                    else{
                        if(user){
                            let token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                msg: "User successfully logged in",
                                details: {token: token, userId: user._id, username: user.username}
                            })
                        }
                        else{
                            let input = {
                                email: response.data.email,
                                username: response.data.name,
                                gSignIn: true
                            }
                            User.create(input, function(err, user){
                                if(err){
                                    res.status(500).json({
                                        msg: "Errornya di create gSignIn",
                                        details: err.message
                                    })
                                }
                                else{
                                    let token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET)
                                    var job = queue.create('welcomeEmail', {
                                        to: user.email,
                                    }).save( function(err){
                                        if( !err ) console.log( job.id );
                                    });
                                    res.status(200).json({
                                        msg: "User successfully registered",
                                        details: {token: token, userId: user._id, username: user.username}
                                    })
                                }
                            })
                        }
                    }
                })
            }
            else{
                console.log("kenapa selali kesini")
                res.status(500).json({
                    msg: "User is not verified / Token is invalid"
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                msg:"Error di Axios gToken",
                details: err.message
            })
        })
        
    },
    sendCron: function(req, res, next){
        User.find({}, function(err, users){
            if(err){
                res.status(500).json({
                    msg: "Errornya di allUsers",
                    details: err.message
                })
            }
            else{
                users.forEach(user => {
                    let input = {
                        to: user.email,
                        from: 'gamecowo12345@gmail.com',
                        subject: 'Merry Xmas and Happy New Year!',
                        text: `I'm wishing you a very merry xmas and happy new year ${new Date().getFullYear()+1}`
                    }
                    transporter.sendMail(input, function(error, info){
                        if (error) {
                            console.log(error, "error didalam transporter CRON nodemamiler")
                            done({msg: error})
                        } else {
                            console.log('Email sent: ' + info.response);
                            done()
                        }
                    })
                })
            }
        })
    }
}