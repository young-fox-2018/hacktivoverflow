var express = require('express');
var router = express.Router();
const isOwner = require('../middlewares/isOwner')
const isLogin = require('../middlewares/isLogin')
const isVote = require('../middlewares/isVote')

const QuestionController = require('../controllers/QuestionController')

router.post('/',isLogin, QuestionController.create)
router.get('/', QuestionController.index)
router.patch('/:id/upvote', isLogin, isOwner.voteQuestion, isVote.isDownVote, QuestionController.upvote)
router.patch('/:id/downvote', isLogin, isOwner.voteQuestion, isVote.isUpvote, QuestionController.downvote)
router.get('/:id', QuestionController.show)
router.post('/:id/answer', isLogin, QuestionController.answer)
router.delete('/:id', isLogin, isOwner.question, QuestionController.destroy)

module.exports = router