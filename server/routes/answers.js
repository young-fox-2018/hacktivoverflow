var express = require('express')
var router = express.Router()
var answerController = require('../controllers/answerController')
var {loginCheck} = require('../middleware/authentication')
var {answerOwnerCheck} = require('../middleware/authorization')
var {upvoteDownvoteAnswerRight} = require('../middleware/authorization')

router.get('/:questionId', answerController.read)
router.use(loginCheck)
router.post('/:questionId', answerController.create)
router.put('/:answerId', answerOwnerCheck, answerController.update)
router.post('/upvote/:answerId', upvoteDownvoteAnswerRight, answerController.upvote)
router.post('/downvote/:answerId', upvoteDownvoteAnswerRight, answerController.downvote)

module.exports = router
