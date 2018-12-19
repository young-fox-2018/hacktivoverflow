var express = require('express');
var router = express.Router();
const AnswerController = require('../controllers/answerController')
const isLoggedIn = require('../middlewares/isLoggedIn')


router.post('/:questionID', isLoggedIn, AnswerController.create)
router.get('/:questionID', AnswerController.readAll)
router.put('/:questionID/:answerID', isLoggedIn, AnswerController.update)
router.patch('/:questionID/:answerID/upvote', isLoggedIn, AnswerController.upVote)
router.patch('/:questionID/:answerID/downvote', isLoggedIn, AnswerController.downVote)


module.exports = router;