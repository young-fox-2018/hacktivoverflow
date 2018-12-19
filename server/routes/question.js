var express = require('express');
var router = express.Router();
const { isUser } = require('../middlewares/isUser.js');

const QuestionController = require('../controllers/question.js');

/* GET questions listing. */
router.get('/all-tag', QuestionController.allTag);
router.get('/search-tag/:text', QuestionController.searchTag);

router.post('/answers/:questionId', isUser, QuestionController.saveAnswer);
router.put('/answers/:questionId/:answerId', isUser, QuestionController.updateAnswer);

router.post('/upvote/question', isUser, QuestionController.upvoteQuestion);
router.post('/noupvote/question', isUser, QuestionController.noUpvoteQuestion);
router.post('/downvote/question', isUser, QuestionController.downvoteQuestion);
router.post('/nodownvote/question', isUser, QuestionController.noDownvoteQuestion);

router.post('/upvote/answer', isUser, QuestionController.upvoteAnswer);
router.post('/noupvote/answer', isUser, QuestionController.noUpvoteAnswer);
router.post('/downvote/answer', isUser, QuestionController.downvoteAnswer);
router.post('/nodownvote/answer', isUser, QuestionController.noDownvoteAnswer);

router.post('/', isUser, QuestionController.create);
router.get('/', QuestionController.read);
router.get('/:questionId', QuestionController.readOne);
router.put('/:questionId', isUser, QuestionController.update);
router.delete('/:questionId', isUser, QuestionController.delete);

module.exports = router;