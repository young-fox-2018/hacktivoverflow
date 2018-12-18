const User = require('../models/user')
const {hashPass, signJwt, compare} = require('../helpers/')

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
                            token: token
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
    }
}