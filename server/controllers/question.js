const Question = require('../models/question')

module.exports = {
    create : function(req, res){
        let input = req.body
        input.userId = req.userId
        Question.create(input, function(err, question){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(question)
            }
        })
    },
    findAll: function(req, res, next){
        Question.find({})
        .populate('userId')
        .exec(function(err, questions){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(questions)
            }
        })
    },
    findById:function(req, res, next){
        Question.findOne({_id : req.params.id})
        .populate('userId')
        .exec(function(err, question){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(question)
            }
        })
    },
    findByUser:function(req, res, next){
        Question.find({userId : req.headers.userid})
        .populate('userId')
        .exec(function(err, questions){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(questions)
            }
        })
    },
    update : function(req, res, next){
        let input = {title, description} = req.body
        input.userId = req.userId
        for(let key in input) {
            if(key == undefined)
            delete input[key]
        }
        input.updatedAt = Date.now()
        console.log(input)
        console.log(req.headers.id,"===========")
        Question.findOneAndUpdate({_id : req.params.id}, {$set: input}, function(err, result){
            if(err) {
                res.status(400).json(err)
            }else{
                console.log("Updated the question");
                res.status(200).json({
                    data: result
                })
            }
        })
    },
    upVote : function(req, res, next){
        console.log(req.hasUpVote,"upvote=====")
        console.log(req.hasDownVote,"downvote=====")
        if(req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$pull: {'upVote' : req.body.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$push: {'upVote' : req.body.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{0
                    res.status(200).json({result})
                }
            })
        }else if(req.hasDownVote && !req.hasUpVote){
            Question.findById(req.params.id, function(err, question){
                if(err){
                    res.status(400).json(err)
                }else{
                    Question.update({_id : question._id}, {$pull: {'downVote' : req.body.userId}, $push: {'upVote' : req.body.userId}}, {new: true }, function(err, result){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(result)
                        }
                    })
                }
            })
        }
    },
    downVote : function(req,res, next){
        console.log(req.hasUpVote,"upvote=====")
        console.log(req.hasDownVote,"downvote=====")
        if(req.hasDownVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$pull: {'downVote' : req.body.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$push: {'downVote' : req.body.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && req.hasUpVote){
            Question.findById(req.params.id, function(err, question){
                if(err){
                    res.status(400).json(err)
                }else{
                    Question.update({_id : question._id}, {$pull: {'upVote' : req.body.userId}, $push: {'downVote' : req.body.userId}}, {new: true }, function(err, result){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(result)
                        }
                    })
                }
            })
        }
        
    },
    delete : function(req, res, next){
        Question.findOneAndDelete({_id: req.params.id}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                console.log("removed the question");
                res.status(204).json("removed question")
            }
        })  
    }
}