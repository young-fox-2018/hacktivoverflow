const Answer = require('../models/answer')
var mongoose = require('mongoose');

module.exports = {
    create : function(req, res){
        req.body.userId = req.userId
        Answer.create(req.body, function(err, answer){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(201).json(answer)
            }
        })
    },
    findAll: function(req, res, next){
        Answer.find({}, function(err, answers){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(answers)
            }
        })
    },
    findByQuestion:function(req, res, next){
        Answer.find({questionId : req.params.id})
        .populate('userId')
        .exec(function(err, answers){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(answers)
            }
        })
    },
    update : function(req, res, next){
        let input = {message} = req.body
        input.updatedAt = Date.now()
        Answer.findOneAndUpdate({_id : req.params.id}, {$set: input}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                console.log("Updated the answer");
                res.status(200).json({result})
            }
        })
    },
    upVote : function(req, res, next){
        Answer.findOneAndUpdate({_id : req.params.id}, {$push: {'upVote' : req.body}}, {new: true}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({result})
            }
        })
    },
    downVote : function(req,res, next){
        Answer.findOneAndUpdate({_id : req.params.id}, {$push: {'downVote' : req.body}}, {new: true}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({result})
            }
        })
    },
    delete : function(req, res, next){
        Answer.findOneAndDelete({_id: req.params.id}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                console.log("removed the answer");
                res.status(200).json("removed answer")
            }
        })  
    }
}