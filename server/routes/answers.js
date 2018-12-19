var express = require('express');
var router = express.Router();
var answerController = require('../controllers/answerController')
var checkLogin = require('../middlewares/checkLogin')
var checkAnswer = require('../middlewares/checkAnswer')

/*GET all answers on specific question*/
router.get('/:questionId', answerController.findAllAnswer)



/*Middleware check login*/
router.use(checkLogin)

/*POST create answer */
router.post('/:questionId', answerController.createAnswer)


/*GET  answer */
router.get('/:id', checkLogin, checkAnswer.checkOwner, answerController.findOneAnswer)

/*PUT edit answer */
router.put('/one/:id', checkLogin, checkAnswer.checkOwner,answerController.editAnswer)

/*POST upvote answer */
router.post('/upvote/:id', checkLogin, checkAnswer.checkNotOwner, answerController.upVoteAnswer)

/*POST downvote answer*/
router.post('/downvote/:id', checkLogin, checkAnswer.checkNotOwner, answerController.downVoteAnswer)



module.exports = router