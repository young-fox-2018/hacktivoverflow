const Question = require('../models/question')
const User = require('../models/user')

class QuestionController {
    static create(req, res) {
        Question.create({
            title: req.body.title,
            detail: req.body.detail,
            userID: req.userID, 
            tag: req.body.tag
        })
        .then( question => {
            res.status(201).json({
                question: question,
                message: `new question has been successfully created`
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from creating new question'
            })
        })
    }

    static readAll(req, res) {
        Question.find({})
        .populate('tag', 'name')
        .populate('userID', 'email name')
        .then( questions => {
            res.status(200).json({
                questions: questions
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from question - readAll questions'
            })
        })
    }

    static readOne(req, res) {
        Question.findOne({
            _id: req.params.questionID
        })
        .populate('userID', 'email name')
        .then( question => {
            res.status(200).json({
                question: question
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from question - findOne'
            })
        })
    }

    static update(req, res) { 
        Question.findOne({
            _id: req.params.questionID,
            userID: req.userID
        })
        .then( question => {
            if (!question) {
                res.status(400).json({
                    message: 'You are not authorized to update this question'
                })
            }
            else {
                Question.findOneAndUpdate({ 
                    _id: req.params.questionID,
                    userID: req.userID
                }, {
                    title: req.body.title,
                    detail: req.body.detail,
                    tag: req.body.tag
                }, {
                    new: true,
                    runValidators: true
                })
                .then( question => {
                    res.status(200).json({
                        question: question,
                        message: `question ${question.title} has been successfully updated`
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        err: err.message,
                        message: 'error from updating question'
                    })
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                err: err.message
            })
        })
    }

    static delete(req, res) { 
        Question.findOne({
            _id: req.params.questionID,
            userID: req.userID
        })
        .then( question => {
            if (!question) {
                res.status(400).json({
                    message: "You are not authorized to delete this question"
                })
            }
            else {
                Question.findOneAndDelete({
                    _id: question._id
                })
                .then( question => {
                    res.status(200).json({
                        question: question,
                        message: `You have deleted question ID ${question._id}`
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        err: err.message,
                        message: 'error from deleting question'
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err.message,
                message: 'error from questions - deleteOne'
            })
        })
    }

    static upVote(req, res) {
        Question.findOne({
            _id: req.params.questionID
        })
        .then( question => { 
            User.findOne({
                _id: question.userID
            })
            .then( user => {
                let loggedInUser = String(req.userID)
                let questionUser = String(question.userID)
                if (loggedInUser !== questionUser) {
                    let upvoteExist = question.upvote.indexOf(req.userID) !== -1
                    if (upvoteExist) {
                        question.upvote.pull(req.userID) 
                        question.save() 

                        user.update({
                            point: user.point -= 1
                        })

                        .then( response => {
                            res.status(200).json({
                                question: question,
                                user: user
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
                        let downvoteExist = question.downvote.indexOf(loggedInUser) !== -1
                        if (downvoteExist) {
                            question.upvote.push(req.userID) 
                            question.downvote.pull(req.userID) 
                            question.save()

                            user.update({
                                point: user.point += 1
                            })

                            .then( response => {
                                res.status(200).json({
                                    question: question,
                                    user
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from downvote exist - updateOne question'
                                })
                            })
                        }
                        else {
                            question.upvote.push(req.userID) 
                            question.save()

                            user.update({
                                point: user.point += 1
                            })

                            .then( response => {
                                res.status(200).json({
                                    question: question,
                                    user
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from downvote not exist - updateOne question'
                                })
                            })
                        }
                    }
                }
                else {
                    res.status(400).json({
                        message: 'You cannot upvote your own question'
                    })
                }

            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from upvote Question - User findOne'
                })
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from upvote - QuestionFindOne'
            })
        })
    }

    static downVote(req, res) {
        Question.findOne({
            _id: req.params.questionID
        })
        .then( question => {

            User.findOne({
                _id: question.userID
            })
            .then( user => {
                
                let loggedInUser = String(req.userID)
                let questionUser = String(question.userID)
                if (loggedInUser !== questionUser) {
                    let downvoteExist = question.downvote.indexOf(req.userID) !== -1
                    if (downvoteExist) {
                        question.downvote.pull(req.userID) 
                        question.save()

                        .then( response => {
                            res.status(200).json({
                                question: question
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
                        let upvoteExist = question.upvote.indexOf(loggedInUser) !== -1
                        if (upvoteExist) {
                            question.downvote.push(req.userID) 
                            question.upvote.pull(req.userID) 
                            question.save()

                            user.update({
                                point: user.point -= 1
                            })
                            
                            .then( response => {
                                res.status(200).json({
                                    question: question
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from upvote exist - updateOne question'
                                })
                            })
                        }
                        else {
                            question.downvote.push(req.userID) 
                            question.save()
                            .then( response => {
                                res.status(200).json({
                                    question
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    err: err.message,
                                    message: 'error from upvote not exist - updateOne question'
                                })
                            })
                        }
                    }
                }
                else {
                    res.status(400).json({
                        message: 'You cannot downvote your own question'
                    })
                }

            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from downvote Question - User findOne'
                })
            })

        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from downvote - QuestionFindOne'
            })
        })
    }

    static filter(req, res) {
        Question.find({
            tag: req.params.tagID
        })
        .populate('tag', 'name')
        .populate('userID', 'email name')
        .then( questions => {
            res.status(200).json({
                questions: questions
            })
        })
        .catch( err => {
            res.status(500).json({
               err: err.message,
               message: 'error from filter tag' 
            })
        })
    }
}

module.exports = QuestionController