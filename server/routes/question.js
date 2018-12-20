const express = require('express')
const router = express.Router()
const {create, findAll, findOne, edit, deleteQuestion, vote} = require('../controllers/questionController.js')
const isLogin = require('../middlewares/isLogin.js')
const isQuestionOwner = require('../middlewares/isQuestionOwner.js')
const voteQuestion = require('../middlewares/voteQuestion.js')

router
      .get('/', findAll)
      .get('/:questionId', findOne)
      .post('/', isLogin, create)
      .put('/vote/:questionId', isLogin, voteQuestion, vote)
      .put('/:questionId', isLogin, isQuestionOwner, edit)
      .delete('/:questionId', isLogin, isQuestionOwner, deleteQuestion)

module.exports = router