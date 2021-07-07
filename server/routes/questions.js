var express = require('express');
var router = express.Router();
const isOwner = require('../middlewares/isOwner')
const isLogin = require('../middlewares/isLogin')
const isVote = require('../middlewares/isVote')
const tag = require('../middlewares/tag')

const QuestionController = require('../controllers/QuestionController')

router.post('/', isLogin, tag.save, QuestionController.create)
router.get('/', QuestionController.index)
router.patch('/:id/upvote', isLogin, isOwner.voteQuestion, isVote.isDownVote, QuestionController.upvote)
router.patch('/:id/downvote', isLogin, isOwner.voteQuestion, isVote.isUpvote, QuestionController.downvote)
router.get('/:id', QuestionController.show)
router.post('/:id/answer', isLogin, QuestionController.answer)
router.delete('/:id', isLogin, isOwner.question, QuestionController.destroy)
router.put('/:id', isLogin, isOwner.question, tag.save, QuestionController.update)
// router.post('/save-tag', tag.save)


module.exports = router