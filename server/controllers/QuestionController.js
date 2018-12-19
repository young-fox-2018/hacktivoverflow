const Question = require('../models/Question');

module.exports = {
  getAllQuestion: function(req, res, next) {
    if(req.query.category) {
      var query = {category: req.query.category};
    } else {
      var query = {};
    }
    Question.find(query).populate('authorId').exec()
    .then(questions => {
      res.status(200).json({
        msg: 'List of questions:',
        questions,
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
  getQuestionDetail: function(req, res, next) {
    const {questionId} = req.params;

    Question.findById(questionId).populate('authorId').exec()
    .then(question => {
      delete question.authorId.password;
      res.status(200).json({
        msg: 'Detail of question',
        question,
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
  getMyQuestion: function(req, res, next) {
    Question.find({authorId: req.current_user})
    .then(questions => {
      res.status(200).json({
        msg: 'List of all my posted questions:',
        questions,
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
  createQuestion: function(req, res, next) {
    const {title, content, category} = req.body;
    const authorId = req.current_user;

    Question.create({title, content, authorId, category, posted_at: new Date(), updated_at: new Date()})
    .then(question => {
      res.status(201).json({
        msg: 'Question posted!',
        question,
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
  updateQuestion: function(req, res, next) {
    const {title, content} = req.body;
    const {questionId} = req.params;

    Question.findById(questionId)
    .then(question => {
      if(question.authorId == req.current_user) {
        question.title = title;
        question.content = content;
        question.updated_at = new Date();
        question.save();
        res.status(201).json({
          msg: 'Question updated',
          question,
        });
      } else {
        res.status(403).json({
          msg: 'You don\'t have authorization to update this question.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
  deleteQuestion: function(req, res, next) {
    const {questionId} = req.params;

    Question.findById(questionId)
    .then(question => {
      if(question.authorId == req.current_user) {
        question.remove();
        res.status(200).json({
          msg: 'Question deleted',
          question,
        });
      } else {
        res.status(403).json({
          msg: 'You don\'t have authorization to delete this question.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
};