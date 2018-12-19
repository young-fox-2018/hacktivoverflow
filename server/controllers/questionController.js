const Question = require('../models/Question')
const moment = require('moment')


module.exports = {
    postQuestion: function (req, res) {
        let newQuestion = {
            title: req.body.title,
            content: req.body.content,
            userId: req.currentUser._id,
            upVote: [],
            downVote: [],
            createdAt: moment(new Date()).format('DD-MMM-YY hh:mm'),
            updatedAt: moment(new Date()).format('DD-MMM-YY hh:mm')
        }
        Question
            .create(newQuestion)
            .then((question) => {
                return Question
                        .findOne({_id: question._id})
                        .populate('userId')
                        .then((response) => {
                            res.status(200).json(response)
                        })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })       
    },
    findAllQuestions: function(req, res) {
        Question
            .find({})
            .sort('-updatedAt')
            .populate('userId')
            .populate('upVote')
            .populate('downVote')
            .then((questions) => {
                res.status(200).json(questions)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    myQuestions: function(req, res) {
        Question
            .find({userId: req.currentUser._id})
            .populate('userId')
            .populate('upVote')
            .populate('downVote')
            .then((myQuestion) => {
                res.status(200).json(myQuestion)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    findOneQuestion: function(req, res) {
        Question
            .findOne({_id: req.params.id})
            .populate('userId')
            .populate('upVote')
            .populate('downVote')
            .then((questionResult) => {
                res.status(200).json(questionResult)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    deleteQuestion: function(req, res) {
        Question
            .findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json({
                    msg: `Successfully deleted question`
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    editQuestion: function(req, res) {
        let newQuestion = {
            title: req.body.title,
            content: req.body.content,
            updatedAt: moment(new Date()).format('DD-MMM-YY hh:mm')
        }
        Question
            .findOneAndUpdate({_id: req.params.id}, newQuestion)
            .then(() => {
                return Question
                        .findOne({_id: req.params.id})
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
    upVoteQuestion: function(req, res) {
        Question
            .findOne({ _id: req.params.id })
            .populate('userId')
            .then((question) => {
                let filterUp = question.upVote.filter((element) => {
                    return element == String(req.currentUser._id)
                })
                let filterDown = question.downVote.filter((element) => {
                    return element == String(req.currentUser._id)
                })
                if(!filterUp.length && !filterDown.length) {
                    return Question
                            .findOneAndUpdate({ _id: req.params.id }, {$push:{'upVote': req.currentUser._id}}, {new: true})
                } else if (filterUp.length && !filterDown.length) {
                    return Question
                            .findOneAndUpdate({_id: req.params.id}, {$pull:{'upVote': req.currentUser._id}}, {new: true})
                } else if (!filterUp.length && filterDown.length) {
                    return Question
                            .findOneAndUpdate({_id: req.params.id}, {$pull: {'downVote': req.currentUser._id}, $push: {'upVote': req.currentUser._id}},  {new: true})
                } else {
                    res.status(403).json({
                        msg: `you already downvote or upvote this question`
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
    downVoteQuestion: function(req, res) {
        Question
        .findOne({ _id: req.params.id })
        .populate('userId')
        .then((question) => {
            let reputaion = question.userId.reputaion
            let filterUp = question.upVote.filter((element) => {
                return element == String(req.currentUser._id)
            })
            let filterDown = question.downVote.filter((element) => {
                return element == String(req.currentUser._id)
            })
            if(!filterUp.length && !filterDown.length) {
                return Question
                .findOneAndUpdate({ _id: req.params.id }, {$push:{'downVote': req.currentUser._id}}, {new: true})
            } else if (!filterUp.length && filterDown.length) {
                return Question
                .findOneAndUpdate({_id: req.params.id}, {$pull:{'downVote': req.currentUser._id}}, {new: true})
            } else if (filterUp.length && !filterDown.length) {
                console.log('masuk controller')
                    return Question
                            .findOneAndUpdate({_id: req.params.id}, {$pull: {'upVote': req.currentUser._id}, $push: {'downVote': req.currentUser._id}}, {new: true})
                } else {
                    res.status(403).json({
                        msg: `you already downvote or upvote this question`
                    })
                }
            })
            .then((result) => {
                // res.status(200).json(result)
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
            })
        })
    }
}