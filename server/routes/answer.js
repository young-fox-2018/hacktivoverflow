var express = require('express');
var router = express.Router();
const answerController = require("../controllers/answerController")
const { isLogin } = require("../middleware/validate")
const { isSelf } = require("../middleware/validate")
/* GET home page. */

router.get('/', answerController.getAnswer)
router.put('/:id', isLogin, answerController.vote)
router.get('/:id', answerController.getOneAnswer)
router.post('/', isLogin, answerController.addAnswer)
router.delete('/', isLogin, answerController.deleteAnswer)

module.exports = router;