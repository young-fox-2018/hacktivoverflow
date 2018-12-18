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
        Question.findOneAndUpdate({_id : req.headers.id}, {$set: input}, function(err, result){
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
        Question.findOneAndUpdate({_id : req.params.id}, {$push: {'upVote' : req.body}}, {new: true}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({result})
            }
        })
    },
    downVote : function(req,res, next){
        Question.findOneAndUpdate({_id : req.params.id}, {$push: {'downVote' : req.body}}, {new: true},function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({result})
            }
        })
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