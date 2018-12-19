const Answer = require('../models/Answer')
const Question = require('../models/Question')

class answerController {
  static create (req, res) {
    // res.json('test')
    let {text} = req.body
    let questionId = req.headers.questionid
    let userId = req._currentUser._id
    Answer.create({
      text: text,
      createdDate: new Date,
      userId: userId
    })
      .then((result_answer) => {
        return Question.findOneAndUpdate({
          _id: questionId
        }, {
          $push: {answerId: result_answer._id}
        }, {
          new: true
        })
      })
      .then((result_question) => {
        res.status(200).json(result_question)
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
  
  static findAll (req, res) {
    // res.json('test find all')
    let questionId = req.headers.questionid
    // let userId = req._currentUser._id
    
    Question.findOne({
      _id: questionId
    })
      .then((result_question) => {
        return Answer.find({
          _id: {$in: result_question.answerId}
        }).populate('userId')
      })
      .then((result_answer) => {
        res.status(200).json(result_answer)
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static findOne(req, res) {
    let answerId = req.params.answerId

    Answer.findOne({
      _id: answerId
    }).populate('userId')
      .then((result_answer) => {
        res.status(200).json(result_answer)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static update (req, res) {
    // res.json('test update')
    let answerId = req.params.answerId
    let {text} = req.body

    Answer.findOneAndUpdate({
      _id: answerId
    }, {
      text
    }, {
      new: true
    })
      .then((result_answer) => {
        res.status(200).json(result_answer)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static upVote(req, res) {
    // res.json('test upvote')
    let answerId = req.params.answerId;
    let userId = req._currentUser._id

    Answer.findOne({
      _id: answerId,
      downVote: userId
    })
      .then((result_answer) => {
        if (result_answer) {
          return Answer.findOneAndUpdate({
            _id: answerId
          }, {
            $pull: {downVote: userId},
            $inc: {voted: 1}
          }, {
            new: true
          })
        } else {
          return null
        }
      })
      .then((result) => {
        return Answer.findOne({
          _id: answerId,
          upVote: userId
        })
      })
      .then((result_answer) => {
        if (result_answer) {
          // res.json('udah ada')
          return Answer.findOneAndUpdate({
            _id: answerId
          }, {
            $pull: {upVote: userId},
            $inc: {voted: -1}
          }, {
            new: true
          })
        } else {
          // res.json('belum ada')
          return Answer.findOneAndUpdate({
            _id: answerId,
          }, {
            $push: {upVote: userId},
            $inc: {voted: 1}
          }, {
            new: true
          })
        }
      })
      .then((result_answer) => {
        res.status(200).json(result_answer)
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static downVote(req, res) {
    // res.json('test downvote')

    let answerId = req.params.answerId;
    let userId = req._currentUser._id

    Answer.findOne({
      _id: answerId,
      upVote: userId
    })
      .then((result_answer) => {
        if (result_answer) {
          return Answer.findOneAndUpdate({
            _id: answerId
          }, {
            $pull: {upVote: userId},
            $inc: {voted: -1}
          }, {
            new: true
          })
        } else {
          return null
        }
      })
      .then((result) => {
        return Answer.findOne({
          _id: answerId,
          downVote: userId
        })
      })
      .then((result_answer) => {
        if (result_answer) {
          // res.json('udah ada')
          return Answer.findOneAndUpdate({
            _id: answerId
          }, {
            $pull: {downVote: userId},
            $inc: {voted: 1}
          }, {
            new: true
          })
        } else {
          // res.json('belum ada')
          return Answer.findOneAndUpdate({
            _id: answerId,
          }, {
            $push: {downVote: userId},
            $inc: {voted: -1}
          }, {
            new: true
          })
        }
      })
      .then((result_answer) => {
        res.status(200).json(result_answer)
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
}

module.exports = answerController