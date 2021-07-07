const router = require('express').Router()
const questionController = require('../controllers/QuestionController')
const isLogin = require('../middlewares/isLogin')
const isOwner = require('../middlewares/isOwner')
const isVote = require('../middlewares/isVote')
const answerController = require('../controllers/AnswerController')

router.patch('/:answerId/upvote', isLogin, isOwner.voteAnswer, isVote.isDownVoteAnswer, questionController.upvoteAnswer)
router.patch('/:answerId/downvote', isLogin, isOwner.voteAnswer, isVote.isUpvoteAnswer, questionController.downvoteAnswer)
router.patch('/:id', isLogin, isOwner.answer, answerController.update)
router.get('/:id', answerController.show)

module.exports = router

