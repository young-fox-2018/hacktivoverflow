const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Comment = require('../models/Comment')
const User = require('../models/User')
const Tag = require('../models/Tag')
const jwtHelper = require('../helpers/jwtHelper')

class QuestionController {
    static create(req,res){
        let user = req.currentUser
        let newTags = req.body.tags.map(tag=> tag.text)
        // console.log(newTags)
        // console.log(req.body)
        // console.log(req.currentUser)
        Question.create({
            author : user.id,
            body: req.body.body,
            title: req.body.title,
            tags: newTags
        })
            .then(question=>{
                // console.log('masuk sini')
                res.status(201).json(question)
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json({
                    errors: err.errors
                })
            })
    }

    static index(req,res){
        Question.find()
            .populate('author')
            .populate('answers')
            .sort({createdAt: -1})
            .then(questions=>{
                res.status(200).json(questions)
            })
            .catch(err=>{
                res.status(400).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

    static upvote(req,res){
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.upVoters.findIndex(upVoter => upVoter == req.currentUser.id)
                if(checkVote !== -1){
                    Question.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $pull: {upVoters: {$in : [req.currentUser.id]}}
                    }, {new: true})
                        .then(updated=>{
                            User.findOneAndUpdate({
                                _id: req.currentUser.id
                            }, {
                                $inc: {reputation: -1}
                            }, {new: true})
                                .then(upvotedUser=> {
                                    res.status(200).json({
                                        message: 'Upvote success!',
                                        updated: updated, 
                                        upvotedUser: upvotedUser
                                    })
                                })
                                .catch(err=> {
                                    res.status(400).json({errors: {reputationUser: {message: 'Can not increment user\'s reputation'} || err.errors ||err. message}})
                                })
                        })
                        .catch(err=>{
                            res.status(400).json({
                                message: 'Internal Server Error',
                                err: err.message
                            })
                        })
                } else {
                    Question.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $push: {upVoters: req.currentUser.id}
                    }, { new: true })
                        .then(updated=>{
                            User.findOneAndUpdate({
                                _id: req.currentUser.id
                            }, {
                                $inc: {reputation: 1}
                            }, {new: true})
                                .then(upvotedUser=> {
                                    res.status(200).json({
                                        message: 'Upvote success!',
                                        updated: updated, 
                                        upvotedUser: upvotedUser
                                    })
                                })
                                .catch(err=> {
                                    res.status(400).json({errors: {reputationUser: {message: 'Can not increment user\'s reputation'} || err.errors ||err. message}})
                                })
                            
                        })
                        .catch(err=>{
                            res.status(400).json({
                                err: err.message
                            })
                        })
                }
            })
        
    }

    static downvote(req,res){
         Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.downVoters.findIndex(voter=> voter == req.currentUser.id)
                if(checkVote !== -1){
                    question.downVoters.pull([req.currentUser.id])
                    question.save()
                    User.findOneAndUpdate({
                        _id: req.currentUser.id
                    }, {
                        $inc: {reputation: 1}
                    }, {new: true})
                        .then(downvotedUser=> {
                            res.status(200).json({
                                message: 'downVote success!',
                                updated: updated, 
                                downvotedUser: downvotedUser
                            })
                        })
                        .catch(err=> {
                            res.status(400).json({errors: {reputationUser: {message: 'Can not increment user\'s reputation'} || err.errors ||err. message}})
                        })
                    res.status(200).json({
                        message: 'Undo DownVote Success!'
                    })
                } else {
                   question.downVoters.push([req.currentUser.id]) 
                   question.save()
                   User.findOneAndUpdate({
                        _id: req.currentUser.id
                    }, {
                        $inc: {reputation: -1}
                    }, {new: true})
                        .then(downvodedUser=> {
                            res.status(200).json({
                                message: 'Upvote success!',
                                updated: updated, 
                                downvodedUser: downvodedUser
                            })
                        })
                        .catch(err=> {
                            res.status(400).json({errors: {reputationUser: {message: 'Can not increment user\'s reputation'} || err.errors ||err. message}})
                        })
                   res.status(200).json({
                       message: 'DownVote Success!'
                   })
                }
            })
            .catch(err=>{
                res.status(400).json({
                    err: err.message,
                    message: 'Internal Server Error'
                })
            })
    }

    static show(req,res){
        Question.findOne({
            _id: req.params.id
        })
            .populate({path: 'answers', populate : { path: 'author', select: ['name', '_id']}})
            .populate({path: 'author', select: ['name', '_id', 'reputation']})
            .then(question=> {
                res.status(200).json(question)
            })
            .catch(err=> {
                res.status(400).json({errors: err.message})
            })
    }

    static answer(req,res){
        Answer.create({
            body: req.body.body,
            author: req.currentUser.id
        })
            .then(answer=> {
                Question.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $push: { answers: answer}
                }, {new: true})
                    .then(updatedQuestion=>{
                        res.status(201).json(updatedQuestion)
                    })
                    .catch(err=> {
                        res.status(400).json({errors: err.errors || err.message})
                    })
            })
            .catch(err=> {
                res.status(400).json({errors: err.errors || {answer: {message: err.message}}})
            })
    }

    static update(req,res){
        let newTags = req.body.tags.map(tag=> tag.text)
        Question.findOneAndUpdate({
            _id: req.params.id
        }, {
            author : req.currentUser.id,
            body: req.body.body,
            title: req.body.title,
            tags: newTags
        }, {new: true})
            .then(updatedQuestion => {
                res.status(201).json(updatedQuestion)
            })
            .catch(err=> {
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static destroy(req,res){
        Question.findOneAndDelete({
            _id: req.params.id
        })
            .then(deleted=> {
                res.status(200).json(deleted)
            })
            .catch(err=> [
                res.status(400).json({errors: err.message})
            ])
    }

    static updateAnswer(req, res){
        Answer.findOneAndUpdate({
            _id: req.params.answerId
        }, {
            body: req.body.body,
            author: req.currentUser.id
        }, {new: true})
        .then(updatedAnswer=>{
            res.status(200).json(updatedAnswer)
        })
        .catch(err=> {
            res.status(400).json({errors: err.errors || err.message})
        })
    }

}

module.exports = QuestionController