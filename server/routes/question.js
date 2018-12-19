var express = require('express');
var router = express.Router();
const questionController = require("../controllers/questionController")
const { isLogin } = require("../middleware/validate")
const { isSelf } = require("../middleware/validate")
/* GET home page. */

router.get('/', questionController.getQuestion)
router.get('/:id', questionController.getOneQuestion)
router.put('/:id', isLogin, isSelf, questionController.vote)
router.post('/', isLogin, isSelf, questionController.addQuestion)
router.delete('/:id', isLogin, isSelf, questionController.deleteQuestion)

module.exports = router;