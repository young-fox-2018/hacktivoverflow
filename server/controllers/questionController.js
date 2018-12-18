const Question = require('../models/Question')

module.exports = {
  getAllQuestions(req, res) {
    Question.find({})
    .then((questions) => {
      if (questions) {
        console.log(questions)
        res.status(200).json({ questions })
      } else {
        res.status(404).json({
          err: 'No article found'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: 'Please try again later'
      })
    })
  },

  createQuestion(req, res) {
    let question = {
      title: req.body.title,
      author: `${req.user.firstName} ${req.user.lastName}`,
      content: req.body.content,
      userId: req.user._id
    }

    Question.create(question)
    .then((question) => {
      res.status(201).json({ question })
    })
    .catch((err) => {
      if (err.errors.message) {
        res.status(500).json({
          err: err.errors.title.message.substr(err.errors.title.message.indexOf(' '))
        })
      } else {
        res.status(500).json( {
          err: 'Please try again later'
        })
      }
    })
  },

  deleteQuestion(req, res) {
    Question.findOneAndDelete({
      userId: req.user._id,
      _id: req.params.questionId
    })
    .then((questions) => {
      if (questions) {
        res.status(204).json()
      } else {
        res.status(404).json({
          err: 'No article found'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: 'Please try again later'
      })
    })
  },

  getOneQuestion(req, res) {
    Question.findById(req.params.questionId)
    .then((question) => {
      if (question) {
        res.status(200).json({ question })
      } else {
        res.status(404).json({
          err: 'Question is not exist'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: 'Please try again later'
      })
    })
  },

  updateQuestion(req, res) {
    let question = {
      title: req.body.title,
      content: req.body.content
    }

    Question.findOneAndUpdate({
      _id: req.params.questionId,
    }, question, { new: true })
      .then((question) => {
        if (question) {
          res.status(200).json({ question })
        } else {
          res.status(404).json({
            err: 'Question not exist'
          })
        }
      })
      .catch((err) => {
        
        if (err.name.indexOf('E11000') !== -1) {
          res.status(400).json({
            msg: 'Duplicate email'
          });
        }

        res.status(500).json({
          err: 'Please try again later'
        })
      })  
  }
}