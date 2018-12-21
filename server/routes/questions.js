var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController')
const { isLogin } = require('../middleware/isLogin')

router.post('/', isLogin, questionController.createQuestion);
router.get('/', questionController.readAllQuestion);
router.get('/:id', questionController.readOneQuestion);
router.put('/:id', isLogin, questionController.editQuestion);
router.delete('/:id', isLogin, questionController.deleteQuestion);
router.put('/upvote/:id', isLogin, questionController.upVoteQuestion)
router.put('/downvote/:id', isLogin, questionController.downVoteQuestion)

module.exports = router;