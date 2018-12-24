const Question = require('../models/question')
const moment = require('moment')

module.exports = {
    create(req, res, next) {
        let newQuestion = {
            user: req.currentUser._id,
            title: req.body.title,
            body: req.body.body,
            date: moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
        }
        Question.create(newQuestion)
            .then(newQuestion => {
                res.status(201).json(newQuestion)
            })  
            .catch(err => {
                res.status(400).json(err.message)
            })
    },
    
    readAll(req, res, next) {
        Question.find({}).sort('-date').populate('user')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    myQuestion(req, res, next) {
        Question.find({user: req.params.userId})
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    readOne(req, res, next) {
        Question.findOne({_id: req.params.questionId}).populate('user')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    update(req, res, next) {    
        let updateQuestion = {
            title: req.body.title,
            body: req.body.body
        }
        Question.findOneAndUpdate({_id: req.params.questionId}, updateQuestion, {new: true})
            .then(newData => {
                res.status(201).json(newData)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    delete(req, res, next) {
        Question.deleteOne({_id: req.params.questionId})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    upvote(req, res, next) {
        Question.findOne({_id: req.params.questionId})
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$push: { 'upvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$pull: { 'upvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length == 0 && filtereddown != 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$pull: { 'downvote': req.currentUser._id },$push: { 'upvote': req.currentUser._id }}, {new: true})
                } 
                else {
                    res.status(400).json({msg: 'error'})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    downvote(req, res, next) {
        Question.findOne({_id: req.params.questionId})
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$push: { 'downvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$pull: { 'upvote': req.currentUser._id }, $push: { 'downvote': req.currentUser._id }}, {new: true})
                }
                else if (filteredup.length == 0 && filtereddown != 0) {
                    return Question.findOneAndUpdate({_id: req.params.questionId}, {$pull: { 'downvote': req.currentUser._id }}, {new: true})
                } 
                else {
                    res.status(400).json({msg: 'error'})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}