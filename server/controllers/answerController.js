const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerController {
  static createAnswer(req, res) {
    Answer.create({
      answer: req.body.answer,
      owner: req.decoded.id,
      question: req.params.id
    })
    .then(response => {
      Question.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $push: { answer: response.id }
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
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }

  static readAnswer(req, res) {
    Answer.find({
      userId: req.decoded.id
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  }

  static editAnswer(req, res) {
    let user = req.decoded
    Answer.findOne({
      _id: req.params.id
    })
    .then(answer => {
      if (String(answer.owner) == String(user.id)) {
        Answer.findByIdAndUpdate({
          _id: req.params.id
        }, {
            answer: req.body.answer
          })
          .then(question => {
            res.status(201).json({
              question
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
      } else {
        res.status(500).json({
          message: 'Sorry, this answer does not belong to you'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }

  static upVoteAnswer(req, res) {
    let voterId = req.decoded.id
    Answer.findOne({
      _id: req.params.id
    })
    .then(data => {
      if (String(data.owner) !== String(voterId)) {
        Answer.findOne({
          _id: req.params.id,
          votersUpId: {
            $in: voterId
          }
        })
        .then(vote => {
          if (vote) {
            res.status(500).json({
              message: 'you already voted this answer'
            })
          } else {
            Answer.findByIdAndUpdate({
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
          message: `you can not upvote on your own answer`
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }

  static downVoteAnswer(req, res) {
    let voterId = req.decoded.id
    Answer.findOne({
      _id: req.params.id
    })
    .then(data => {
      if (String(data.owner) != String(voterId)) {
        Answer.findOne({
          _id: req.params.id,
          votersDownId: {
            $in: voterId
          }
        })
        .then(vote => {
          if (vote) {
            res.status(500).json({
              message: 'you already voted this answer'
            })
          } else {
            Answer.findByIdAndUpdate({
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
          message: `you can't downvote on your answer`
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

module.exports = AnswerController