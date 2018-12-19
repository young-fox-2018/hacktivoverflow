var express = require('express');
var router = express.Router();
const QuestionController = require('../controllers/questionController')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/', isLoggedIn, QuestionController.create)
router.get('/', QuestionController.readAll)
router.get('/filter/:tagID', QuestionController.filter)
router.get('/:questionID', QuestionController.readOne)
router.patch('/:questionID', isLoggedIn, QuestionController.update) 
router.delete('/:questionID', isLoggedIn, QuestionController.delete)
router.patch('/:questionID/upvote', isLoggedIn, QuestionController.upVote)
router.patch('/:questionID/downvote', isLoggedIn, QuestionController.downVote)



module.exports = router;
