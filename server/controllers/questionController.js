const Question = require('../models/question')

module.exports = {
    getAll: function (req, req, next) {
        Question.find()
            .populate('author')
            .populate({
            path: 'answer', populate: [{ path: 'owner' }]
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
    getOne: function (req, res, next) {
        Question.findOne({
            _id: req.params.id
          })
            .populate('author')
            .populate({
              path: 'answer', populate: [{ path: 'owner' }]
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json({
                    err: err.message
                })
            })
    },
    newQuestion: function (req, req, next) {
        let newQuestion = {
            owner: req.headers.id,
            title: req.body.title,
            description: req.body.description
        }
        Question.create(newQuestion)
            .then(function(Question) {
                res.status(200).json(Question)
            })
            .catch(function(err) {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    updateQuestion: function (req, req, next) {
        let update = {
            title: req.body.update.title,
            description: req.body.update.title
        }
        Question.findOneAndUpdate({
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
    },
    deleteQuestion: function (req, req, next) {
        let target = {
            title: req.body.title
        }
        Question.findOneAndDelete(target)
            .then(function() {
                res.status(200).json({
                    msg: 'delete success'
                })
            })
            .catch(function(err) {
                res.status(400).json({
                    msg: err.message
                })
            })
    },
    upvoteQuest: (req, res) => {
        let voterId = req.user.id
        Question.findOne({
          _id: req.params.id
        })
          .then(question => {
            if ((question.author).toString() !== (voterId).toString()) {
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
                        console.log('error upvote here', err)
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
                message: `you can't upvote on your question`
              })
            }
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
    },
}