const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')

class AnswerController {
    static create(req, res) {
        Question.findOne({
            _id: req.params.questionID
        })
        .then( question => {
            if (!question) {
                res.status(400).json({
                    message: 'question ID is not valid'
                })
            }
            else {
                Answer.create({
                    detail: req.body.detail,
                    questionID: req.params.questionID,
                    userID: req.userID
                })
                .then( answer => {
                    res.status(201).json({
                        answer: answer,
                        message: 'new answer has been created'
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        err: err.message,
                        message: 'error from creating new answer'
                    })
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from create new answer: findOne Question'
            })
        })
    }

    static readAll(req, res) {
        Answer.find({
            questionID: req.params.questionID
        })
        .populate('userID', 'email')
        .then( answers => {
            res.status(200).json({
                answers: answers
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from readAll answers'
            })
        })
    }

    static update(req, res) { 
        Answer.findOne({
            _id: req.params.answerID,
            questionID: req.params.questionID,
            userID: req.userID
        })
        .then( answer => {
            if (!answer) {
                res.status(400).json({
                    message: 'You are not authorized to update this answer'
                })
            }
            else {
                Answer.findOneAndUpdate({ 
                    _id: req.params.answerID,
                    questionID: req.params.questionID,
                    userID: req.userID
                }, {
                    detail: req.body.detail
                }, {
                    new: true,
                    runValidators: true
                })
                .then( answer => {
                    res.status(200).json({
                        answer: answer,
                        message: `answer has been successfully updated`
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        err: err.message,
                        message: 'error from updating answer'
                    })
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from update answer - findOne answer'
            })
        })
    }

    static upVote(req, res) {
        Answer.findOne({
            _id: req.params.answerID,
            questionID: req.params.questionID
        })
        .then( answer => {

            User.findOne({
                _id: answer.userID
            })
            .then( user => {
                let loggedInUser = String(req.userID)
                let answerUser = String(answer.userID)
                if (loggedInUser !== answerUser) {
                    let upvoteExist = answer.upvote.indexOf(req.userID) !== -1
                    if (upvoteExist) {
                        answer.upvote.pull(req.userID) 
                        answer.save()

                        user.update({
                            point: user.point -= 1
                        })

                        .then( response => {
                            res.status(200).json({
                                answer: answer,
                                user
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                err: err.message,
                                message: 'error from upvote exist - pull upvote'
                            })
                        })
                    }
                    else {
                        let downvoteExist = answer.downvote.indexOf(loggedInUser) !== -1
                        if (downvoteExist) {
                            answer.upvote.push(req.userID) 
                            answer.downvote.pull(req.userID) 
                            answer.save()

                            user.update({
                                point: user.point += 1
                            })

                            .then( response => {
                                res.status(200).json({
                                    answer: answer,
                                    user
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from downvote exist - updateOne answer'
                                })
                            })
                        }
                        else {
                            answer.upvote.push(req.userID) 
                            answer.save()

                            user.update({
                                point: user.point += 1
                            })

                            .then( response => {
                                res.status(200).json({
                                    answer: answer,
                                    user
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from downvote not exist - updateOne answer'
                                })
                            })
                        }
                    }
                }
                else {
                    res.status(400).json({
                        message: 'You cannot upvote your own answer'
                    })
                }

            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from upvote Answer - User findOne'
                })
            })

        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from upvote - AnswerFindOne'
            })
        })
    }

    static downVote(req, res) {
        Answer.findOne({
            _id: req.params.answerID,
            questionID: req.params.questionID
        })
        .then( answer => { 

            User.findOne({
                _id: answer.userID
            })
            .then( user => {
                let loggedInUser = String(req.userID)
                let questionUser = String(answer.userID)
                if (loggedInUser !== questionUser) {
                    let downvoteExist = answer.downvote.indexOf(req.userID) !== -1
                    if (downvoteExist) {
                        answer.downvote.pull(req.userID) 
                        answer.save()
                        .then( response => {
                            res.status(200).json({
                                answer: answer
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                err: err.message,
                                message: 'error from downvote exist - pull downvote'
                            })
                        })
                    }
                    else {
                        let upvoteExist = answer.upvote.indexOf(loggedInUser) !== -1
                        if (upvoteExist) {
                            answer.downvote.push(req.userID) 
                            answer.upvote.pull(req.userID) 
                            answer.save()
    
                            user.update({
                                point: user.point -= 1
                            })
    
                            .then( response => {
                                res.status(200).json({
                                    answer: answer
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from upvote exist - updateOne answer'
                                })
                            })
                        }
                        else {
                            answer.downvote.push(req.userID) 
                            answer.save()
                            .then( response => {
                                res.status(200).json({
                                    answer
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from upvote not exist - updateOne answer'
                                })
                            })
                        }
                    }
                }
                else {
                    res.status(400).json({
                        message: 'You cannot downvote your own answer'
                    })
                }

            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from downvote Answer - User findOne'
                })
            })

        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from downvote - AnswerFindOne'
            })
        })
    }
}

module.exports = AnswerController