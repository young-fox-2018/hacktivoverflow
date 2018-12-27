const User = require('../models/User')
const jwtHelper = require('../helpers/jwtHelper')
const bcryptHelper = require('../helpers/bcryptHelper')
const Tag = require('../models/Tag')
const cron = require('cron').CronJob
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


class UserController {
    static register(req,res){
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(user){
                    res.status(400).json({
                        message: 'Email is already exists, please pick another'
                    })
                } else {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                        .then(response=>{
                            let job = new cron('* * * * * *', function(){
                                console.log('masuk cron')
                                const msg = {
                                    to: response.email,
                                    from: 'muhamad.abduh.muh@gmail.com',
                                    subject: 'Welcome to hacktiv overflow',
                                    text: 'continue your work',
                                    html: `<strong>continue your work</strong>`,
                                  };
                                sgMail.send(msg);
                                job.stop()
                            }, function(){
                                console.log(' job is done!')
                            })
                            job.start()
                            res.status(201).json({
                                user: response,
                                message: 'User is succesfully registered!'
                            })
                        })
                        .catch(error=>{
                            if(error.errors.email || error.errors.password){
                                res.status(400).json({
                                    message: 'Invalid input'
                                })
                            } else {
                                res.status(500).json(error)
                            }
                        })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            }) 
    }

    static login(req,res){
        
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(user){
                    if(bcryptHelper.decode(req.body.password, user.password)){
                        let data = {
                            id : user._id,
                            role: user._role,
                            name: user.name
                        }
                        let token = jwtHelper.encode(data)
                        res.status(200).json({
                            name: user.name,
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            message: 'Email and password missmatch'
                        })
                    }
                } else {
                    res.status(400).json({
                        message: 'Email doesn\'t match with our records'
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: "Internal Server error",
                    error: err.message
                })
            })
        
    }

    static index(req,res){
        User.find()
            .populate('questions')
            .populate('answers')
            .populate('interests')
            .then(users=>{
                res.status(200).json(users)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

    static checkLogin(req,res){
        User.findOne({
            _id: req.currentUser.id
        })
            .then(user=> {
                res.status(200).json({name: user.name, id: user._id})
            })
            .catch(err=> {
                res.status(400).json({errors: {auth: {message: err.message}}})
            })
    }
}

module.exports = UserController