var express = require('express')
var router = express.Router()
var questionController = require('../controllers/questionController')
var {loginCheck} = require('../middleware/authentication')
var {questionOwnerCheck} = require('../middleware/authorization')
var {questionOwnerCheck2} = require('../middleware/authorization')
var {upvoteDownvoteRight} = require('../middleware/authorization')

router.get('/', questionController.readAll)
router.get('/:questionId', questionController.readOne)
router.use(loginCheck)
router.post('/', questionController.create)
router.get('/myQuestions/:userId', questionOwnerCheck, questionController.myQuestion)
router.put('/:questionId', questionOwnerCheck2, questionController.update)
router.delete('/:questionId', questionOwnerCheck2, questionController.delete)
router.post('/upvote/:questionId', upvoteDownvoteRight, questionController.upvote)
router.post('/downvote/:questionId', upvoteDownvoteRight, questionController.downvote)

module.exports = router;
