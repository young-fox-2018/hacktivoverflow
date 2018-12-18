const {verifyToken} = require('../helpers/helper')
const User = require('../models/User')
const Question = require('../models/Question')

class middleware {
  static authentication(req, res, next) {
    let token = req.headers.auth

    verifyToken(token, function(err, result){
      if (err) {
        res.status(400).json({
          message: err.message
        })
      } else {
        User.findOne({
          email: result.email
        })
        .then((result_user) => {
          if (!result_user) {
            res.status(400).json({
              message: 'User not found1'
            })
          } else {
            req._currentUser = result_user
            next()
          }
        }).catch((err) => {
          res.status(400).json({
            message: err.message
          })
        });
      }
    })
  }

  static authorQuestion(req, res, next) {
    let questionId = req.params.questionId;
    let userId = req._currentUser._id;
    // console.log(questionId, 'question id');
    // console.log(userId, 'user id');
    Question.findOne({
      _id: questionId,
    })
      .then((result_question) => {
        if (result_question) {
          // console.log(result_question.userId.toString() == userId.toString(), 'from result')
          // console.log(userId, 'from login')
          if (result_question.userId.toString() == userId.toString()) {
            next()
          } else {
            res.status(400).json({
              message: 'You don\'t have permission! '
            })
          }
        } else {
          res.status(400).json({
            message: "Question not found!"
          })
        }
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static notAuthorQuestion(req, res, next) {
    let userId = req._currentUser._id
    let questionId = req.params.questionId
    Question.findOne({
      _id: questionId,
    })
      .then((result_question) => {
        if (result_question) {
          // console.log(result_question.userId.toString() == userId.toString(), 'from result')
          // console.log(userId, 'from login')
          if (result_question.userId.toString() != userId.toString()) {
            next()
          } else {
            res.status(400).json({
              message: 'You can\'t vote your own question! '
            })
          }
        } else {
          res.status(400).json({
            message: "Question not found!"
          })
        }
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
}

module.exports = middleware