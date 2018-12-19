var express = require('express');
var router = express.Router();
const AnswerController = require('../controllers/answerController');
const Auth = require('../middlewares/auth');

// router.get('/myanswer/:userId', Auth.isLogin)
router.post('/:questionId', Auth.isLogin, AnswerController.create);
router.get('/:questionId',  AnswerController.readAnswerFromQuestion);
router.put('/:answerId', Auth.isLogin, AnswerController.update);
router.patch('/upvote/:answerId', Auth.isLogin, AnswerController.upvote);
router.patch('/downvote/:answerId', Auth.isLogin, AnswerController.downvote);
module.exports = router