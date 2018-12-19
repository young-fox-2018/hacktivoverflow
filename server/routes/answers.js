const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController')
const {authentication, authorAnswer, notAuthorAnswer} = require('../middlewares/middleware');

router.post('/', authentication, answerController.create);
router.get('/', answerController.findAll);
router.get('/:answerId', answerController.findOne);
router.put('/:answerId', authentication, authorAnswer, answerController.update);
router.get('/:answerId/upvote', authentication, notAuthorAnswer, answerController.upVote);
router.get('/:answerId/downvote', authentication, notAuthorAnswer, answerController.downVote);
// router.delete('/:questionId', authentication, authorQuestion, questionController.delete);

module.exports = router;
