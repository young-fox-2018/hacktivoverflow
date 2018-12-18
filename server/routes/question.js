var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const questionController = require('../controllers/questionController')

router.get('/', questionController.getAllQuestions)
router.post('/', auth.checkUser, questionController.createQuestion)
router.get('/:questionId', questionController.getOneQuestion)
router.put('/:questionId', auth.checkUser, questionController.updateQuestion)
router.delete('/:questionId', auth.checkUser, questionController.deleteQuestion)
module.exports = router;
