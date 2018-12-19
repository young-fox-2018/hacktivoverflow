const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const {authentication, authorQuestion, notAuthorQuestion} = require('../middlewares/middleware');

router.post('/', authentication, questionController.create);
router.get('/', questionController.findAll);
router.get('/search', questionController.search);
router.get('/my', authentication, questionController.findMy);
router.get('/:questionId', questionController.findOne);
router.get('/:questionId/upvote', authentication, notAuthorQuestion, questionController.upVote);
router.get('/:questionId/downvote', authentication, notAuthorQuestion, questionController.downVote);
router.put('/:questionId', authentication, authorQuestion, questionController.update);
router.delete('/:questionId', authentication, authorQuestion, questionController.delete);

module.exports = router;
