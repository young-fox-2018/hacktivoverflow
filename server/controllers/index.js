const User = require('../models/user')
const {hashPass, signJwt, compare, nodemailer} = require('../helpers/')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
var kue = require('kue')
 , queue = kue.createQueue();

queue.process('email', function(job, done){
    nodemailer(job, done);
  });  

module.exports = {
    register : function(req,res){
        User.findOne({email : req.body.email}, function(err, user){
            if(err){
                res.status(400).json(err)
                console.log(err)
            }else {
                if(user){
                    res.status(400).json({message : "User already exist"})
                }
                else{
                    if(req.body.password) req.body.password = hashPass(req.body.password) 
                    User.create(req.body, function(err, users){
                        if(err){
                            res.status(400).json(err)
                            console.log(err)
                        }else{
                            console.log(users)
                            var job = queue.create('email', {recipient: users.email, name: users.name
                              }).save( function(err){
                                if( !err ) console.log( job.id );
                            });

                            // nodemailer({recipient : users.email, name: users.name})
                            res.status(201).json(users)
                        }
                    })
                }
            }
        })
    },
    login : function(req, res){
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                res.status(400).json(err)
                console.log(err)
            }else{
                if(user){
                    if(compare(req.body.password, user.password)){
                        var token = signJwt({
                            id: user._id, 
                            email: user.email
                        });
                        res.status(200).json({
                            msg : "user login", 
                            token: token,
                            id : user._id,
                            email: user.email

                        })
                    }else{
                        res.status(401).json({message : "Unauthorized : wrong password"})
                    }
                }else{
                    res.status(404).json({
                        message: "User not found"
                    })
                }
            }
        })
    },
    loginGoogle: function(req,res){
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.token}`
        })
        .then(result => {
            console.log(result)
        })
        .catch(err=> {
            console.log(err)
        })
    }
}