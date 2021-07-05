const Answer = require('../models/Answers')
const moment = require('moment')

module.exports = {
    createAnswer: function (req, res) {
        let newAnswer = {
            content: req.body.content,
            questionId: req.params.questionId,
            userId: req.currentUser._id,
            createdAt: moment(new Date()).format('DD-MMM-YY hh:mm'),
            updatedAt: moment(new Date()).format('DD-MMM-YY hh:mm')
        }
        Answer
            .create(newAnswer)
            .then((answer) => {
                res.status(201).json(answer)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    findAllAnswer: function(req, res) {
        Answer
            .find({ questionId: req.params.questionId })
            .sort('-updatedAt')
            .populate('questionId')
            .populate('userId')
            .populate('upVote')
            .populate('downVote')
            .then((answers) => {
                console.log(answers)
                res.status(200).json(answers)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    myAnswer: function(req, res) {
        Answer
            .find({userId: req.currentUser._id})
            .then((answers) => {
                res.status(200).json(answers)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })    
    },
    editAnswer: function(req, res) {
        let newAnswer = {
            content: req.body.content,
            updatedAt: moment(new Date()).format('DD-MMM-YY hh:mm')
        }
        Answer
            .findOneAndUpdate({_id: req.params.id}, newAnswer)
            .then((data) => {
                console.log(data)
               return Answer
                    .findOne({questionId: data.questionId})
                    .populate('userId')
                    .then((updated) => {
                        res.status(200).json(updated)
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    findOneAnswer: function(req, res) {
        Answer
            .findOne({_id: req.params.id})
            .populate('questionId')
            .populate('userId')
            .populate('upVote')
            .populate('downVote')
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    upVoteAnswer: function(req, res) {
        Answer
            .findOne({ _id: req.params.id })
            .populate('userId')
            .then((answer) => {
                let filterUp = answer.upVote.filter((element) => {
                    return element == String(req.currentUser._id)
                })
                let filterDown = answer.downVote.filter((element) => {
                    return element == String(req.currentUser._id)
                })
                if(!filterUp.length && !filterDown.length) {
                    return Answer
                            .findOneAndUpdate({ _id: req.params.id }, {$push:{'upVote': req.currentUser._id}}, {new: true})
                } else if (filterUp.length && !filterDown.length) {
                    return Answer
                            .findOneAndUpdate({_id: req.params.id}, {$pull:{'upVote': req.currentUser._id}}, {new: true})
                } else if (!filterUp.length && filterDown.length) {
                    return Answer
                            .findOneAndUpdate({_id: req.params.id}, {$pull: {'downVote': req.currentUser._id}, $push: {'upVote': req.currentUser._id}},  {new: true})
                } else {
                    res.status(403).json({
                        msg: `you already downvote or upvote this Answer`
                    })
                }
            })
            .then((result) => {
                console.log(result)
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
            })
        })
    },
    downVoteAnswer: function(req, res) {
        Answer
        .findOne({ _id: req.params.id })
        .populate('userId')
        .then((answer) => {
            let filterUp = answer.upVote.filter((element) => {
                return element == String(req.currentUser._id)
            })
            let filterDown = answer.downVote.filter((element) => {
                return element == String(req.currentUser._id)
            })
            if(!filterUp.length && !filterDown.length) {
                return Answer
                        .findOneAndUpdate({ _id: req.params.id }, {$push:{'downVote': req.currentUser._id}}, {new: true})
            } else if (!filterUp.length && filterDown.length) {
                return Answer
                        .findOneAndUpdate({_id: req.params.id}, {$pull:{'downVote': req.currentUser._id}}, {new: true})
            } else if (filterUp.length && !filterDown.length) {
                return Answer
                        .findOneAndUpdate({_id: req.params.id}, {$pull: {'upVote': req.currentUser._id}, $push: {'downVote': req.currentUser._id}}, {new: true})
            } else {
                res.status(403).json({
                    msg: `you already downvote or upvote this question`
                    })
                }
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
            })
        })
    }
}