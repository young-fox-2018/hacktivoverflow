var express = require('express');
var router = express.Router();
var answerController = require('../controllers/answerController')
var checkLogin = require('../middlewares/checkLogin')

/*FIND ONE answer */
// router.get('/:answerId', answerController.findOneAnswer)

router.use(checkLogin)

/*GET all answer on user logged in */
router.get('/', answerController.myAnswer)


module.exports = router