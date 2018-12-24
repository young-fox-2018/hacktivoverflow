const Answer = require('../models/answer')
const Question = require('../models/question')
const moment = require('moment')

module.exports = {
    create(req, res, next) {
        let newAnswer = {
            user: req.currentUser._id,
            question: req.params.questionId,
            body: req.body.body,
            date: moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
        }
        let temp = {}
        Answer.create(newAnswer)
            .then(newAnswer => {
                temp = newAnswer
                return Question.findOneAndUpdate({_id: newAnswer.question}, {$push: {'answers': newAnswer._id}}, {new: true})
            })
            .then(result => {
                res.status(201).json({msg: 'New answer created', temp, result})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    read(req, res, next) {
        Answer.find({question: req.params.questionId}).sort('-date').populate('user')
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    update(req, res, next) {
        let updateAnswer = {
            body: req.body.body
        }
        Answer.findOneAndUpdate({_id: req.params.answerId}, updateAnswer, {new: true})
            .then(newData => {
                res.status(201).json({msg: 'Answer updated', newData})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    upvote(req, res, next) {
        Answer.findOne({_id: req.params.answerId})
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$push: { 'upvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$pull: { 'upvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length == 0 && filtereddown != 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$pull: { 'downvote': req.currentUser._id },$push: { 'upvote': req.currentUser._id }}, {new: true})
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
        Answer.findOne({_id: req.params.answerId})
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == String(req.currentUser._id)
                })
                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$push: { 'downvote': req.currentUser._id }}, {new: true})
                } 
                else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$pull: { 'upvote': req.currentUser._id }, $push: { 'downvote': req.currentUser._id }}, {new: true})
                }
                else if (filteredup.length == 0 && filtereddown != 0) {
                    return Answer.findOneAndUpdate({_id: req.params.answerId}, {$pull: { 'downvote': req.currentUser._id }}, {new: true})
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