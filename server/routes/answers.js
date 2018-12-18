const express = require('express')
const router = express.Router()
const {loginAuth} = require('../middlewares/loginAuth')
const answerController = require('../controllers/answer')

router.get('/:id', answerController.findByQuestion);
router.post('/', loginAuth, answerController.create);
router.put('/:id', loginAuth, answerController.update);
router.put('/upvote/:id', loginAuth, answerController.upVote);
router.put('/downvote/:id', loginAuth, answerController.downVote);
router.delete('/:id', loginAuth, answerController.delete);

module.exports = router; 