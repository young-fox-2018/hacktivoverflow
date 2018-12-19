const Question = require('../models/Question')

class QuestionController {
    static createQuestion(req, res) {
        Question.create({
            title: req.body.title,
            question: req.body.question,
            author: req.decoded.id
        })
        .then(() => {
            res.status(200).json({
                message: 'successfully created question'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    static readAllQuestion(req, res) {
        Question.find()
        .populate('author')
        .populate({
            path: 'answer', populate: [{ path: 'owner' }]
        })
        .then(questions => {
            res.status(200).json({
                questions
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    static readOneQuestion(req, res) {
        Question.findOne({
            _id: req.params.id
        })
        .populate('author')
        .populate({
            path: 'answer', populate: [{ path: 'owner' }]
        })
        .then(question => {
            res.status(200).json({
                question
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    static editQuestion(req, res) {
        let user = req.decoded
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if (String(data.author) == String(user.id)) {
            Question.updateOne({
                _id: req.params.id
            }, {
                title: req.body.title,
                question: req.body.question,
            })
            .then(update => {
                res.status(201).json({
                    update
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
            } else {
                res.status(500).json({
                    message: 'Sorry, this question does not belong to you'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    static deleteQuestion(req, res) {
        let user = req.decoded
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if (String(data.author) == String(user.id)) {
            Question.deleteOne({
                _id: req.params.id
            })
                .then(remove => {
                    res.status(200).json({
                        remove
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            } else {
                res.status(500).json({
                    message: 'Sorry, this question does not belong to you'
                })
            }
        })
    }

    static upVoteQuestion(req, res) {
        let voterId = req.decoded.id
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if (String(data.author) !== String(voterId)) {
                Question.findOne({
                    _id: req.params.id,
                    votersUpId: {
                        $in: voterId
                    }
                })
                .then(vote => {
                    if (vote) {
                        res.status(500).json({
                            message: 'you already voted this question'
                        })
                    } else {
                        Question.findByIdAndUpdate({
                            _id: req.params.id
                        }, {
                            $addToSet: { votersUpId: voterId },
                            $pull: { votersDownId: voterId },
                            $inc: { vote: 1 }
                        })
                        .then(upvote => {
                            res.status(200).json({
                                message: 'upvote success',
                                upvote
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: err.message
                            })
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            } else {
                res.status(500).json({
                    message: `you can not upvote on your own question`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    static downVoteQuestion(req, res) {
        let voterId = req.decoded.id
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if ((data.author).toString() !== (voterId).toString()) {
                Question.findOne({
                    _id: req.params.id,
                    votersDownId: {
                        $in: voterId
                    }
                })
                .then(vote => {
                    if (vote) {
                        res.status(500).json({
                            message: 'you already voted this question'
                        })
                    } else {
                        Question.findByIdAndUpdate({
                            _id: req.params.id
                        }, {
                            $addToSet: { votersDownId: voterId },
                            $pull: { votersUpId: voterId },
                            $inc: { vote: -1 }
                        })
                        .then(downvote => {
                            res.status(200).json({
                                message: 'downvote success',
                                downvote
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: err.message
                            })
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            } else {
                res.status(500).json({
                    message: `you can not downvote on your own question`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }
}

module.exports = QuestionController