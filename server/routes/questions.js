const express = require('express')
const router = express.Router()
const   {loginAuth, cekQuestionVote} = require('../middlewares/loginAuth'),
        questionController = require('../controllers/question')

router.get('/', questionController.findAll);
router.get('/mine', loginAuth, questionController.findByUser)
router.get('/:id', questionController.findById);
router.post('/', loginAuth, questionController.create);
router.put('/:id', loginAuth, questionController.update);
router.put('/upvote/:id', loginAuth, cekQuestionVote, questionController.upVote);
router.put('/downvote/:id', loginAuth, cekQuestionVote, questionController.downVote);
router.delete('/:id', loginAuth, questionController.delete);

module.exports = router; 