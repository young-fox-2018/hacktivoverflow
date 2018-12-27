const Question = require('../models/Question')
const Answer = require('../models/Answer')

class isVote{
    static isDownVote(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.downVoters.findIndex(voter => voter == req.currentUser.id)
                if(checkVote !== -1){
                    question.downVoters.pull([req.currentUser.id])
                    question.save()
                    next()
                } else {
                    next()
                }
            })
            .catch(err=>{
                res.status(400).json({
                    errors: err.errors
                })
            })
    }

    static isUpvote(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.upVoters.findIndex(voter=> voter==req.currentUser.id)
                if(checkVote !== -1){
                    question.upVoters.pull([req.currentUser.id])
                    question.save()
                    next()
                } else {
                    next()
                }
            })
    }

    static isUpvoteAnswer(req,res,next){
        Answer.findOne({
            _id: req.params.answerId,
        })
            .then(answer=> {
                let checkVote = answer.upVoters.findIndex(voter=> voter==req.currentUser.id)
                if(checkVote !== -1){
                    answer.upVoters.pull([req.currentUser.id])
                    answer.save()
                    next()
                } else {
                    next()
                }
            })
            .catch(err=> {
                res.status(400).json(err)
            })
    }

    static isDownVoteAnswer(req,res,next){
        Answer.findOne({
            _id: req.params.answerId
        })
            .then(answer=>{
                let checkVote = answer.downVoters.findIndex(voter=> voter == req.currentUser.id)
                if(checkVote !== -1){
                    answer.upVoters.pull([req.currentUser.id])
                    answer.save()
                    next()
                } else {
                    next()
                }
            })
    }
}

module.exports = isVote