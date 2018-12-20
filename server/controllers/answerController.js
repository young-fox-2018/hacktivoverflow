const Answer = require('../models/answer')

module.exports = {
    getAll: function (req, req, next) {
        Answer.find({
            articleId: req.params.id
        })
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    newAnswer: function (req, req, next) {
        let newAnswer = {
            title: req.body.title,
            description: req.body.description
        }
        Answer.create(newAnswer)
            .then(function(Answer) {
                res.status(200).json(Answer)
            })
            .catch(function(err) {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    updateAnswer: function (req, req, next) {
        let update = {
            title: req.body.update.title,
            description: req.body.update.title
        }
        Answer.findOneAndUpdate({
            title: req.body.title
        }, update)
            .then(function() {
                releaseEvents.status(200).json({
                    msg: 'update success'
                })
            })
            .catch(function(err) {
                res.status(400).json({
                    msg: err.message
                })
            })
    }
}