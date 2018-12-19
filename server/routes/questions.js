var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController')
var checkLogin = require('../middlewares/checkLogin')
var checkQuestion = require('../middlewares/checkQuestion')

/*GET all questions*/
router.get('/', questionController.findAllQuestions)

/*GET one question*/
router.get('/:id', questionController.findOneQuestion)

/* Middleware checkLogin */
router.use(checkLogin)


/* POST create question */
router.post('/', questionController.postQuestion)


/*DELETE question*/
router.delete('/:id', checkLogin , checkQuestion.checkOwner, questionController.deleteQuestion)

/*PUT questions*/
router.put('/:id', checkLogin, checkQuestion.checkOwner, questionController.editQuestion)

/*POST upvote question */
router.post('/upvote/:id', checkLogin, checkQuestion.checkNotOwner, questionController.upVoteQuestion)

/*POST downvote question*/
router.post('/downvote/:id', checkLogin, checkQuestion.checkNotOwner, questionController.downVoteQuestion)



module.exports = router