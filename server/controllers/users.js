const User = require("../models/User")
const bcrypt = require("../helpers/bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const kue = require('kue'),
    queue = kue.createQueue()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gamecowo12345@gmail.com',
        pass: 'gamecowo54321'
    }
})

queue.process('registerationMail', function({data}, done) {
    let mailOptions = {
        from: '"Scatter Overflow" <gamecowo12345@gmail.com>', // sender address
        to: data.email,
        subject: 'Welcome to Scatter Overflow', // Subject line
        html: 'Thank you for registering' // html body
    };
    transporter.sendMail(mailOptions, (err, info) =>{
        if (err) {
            return console.log(err);
        }
        else{
            console.log('Message sent: %s', info.messageId);
            done()
        }
    })
})

module.exports = {
    create: function(req,res,next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }, function(err, user){
            if(err) {res.status(400).json({message: err.message})} 
            else {
                var job = queue.create('registerationMail', {
                    name: user.name,
                    email: user.email,
                }).save( function(err){
                    if(err) console.log(err)
                    else console.log(job.id)
                })

                res.status(200).json({
                    user,
                    message: 'You successfully registered as user'
                })
            }
        })
    },
    all: function(req,res,next){
        User.find({})
        .exec( function(err,users_data){
            if(err) res.status(400).json({message: err.message})
            else{
                res.status(200).json({data: users_data})
            }
        })
    },
    signIn: function(req,res,next){
        User.findOne({
            email: req.body.email
        }, function(err,users_data){
            if(err){
                res.status(400).json({message: err.message})
            }
            else{
                if(!users_data){
                    res.status(400).json({message: "email is not found"})
                } else {
                    // res.json(users_data)
                    if(bcrypt.checkPassword(req.body.password, users_data.password)){
                        res.status(200).json({
                            token: jwt.sign(users_data.email, process.env.jwtSecret),
                            user: {...users_data._doc},
                            message: `You sucessfully signed in`
                        })
                    } else{
                        res.status(400).json({message: "incorrect password"})
                    }
                }
            }
        })
    }
}