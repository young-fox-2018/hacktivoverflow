const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', QuestionController.getAllQuestion);

router.get('/me', verifyToken, QuestionController.getMyQuestion);

router.get('/:questionId', QuestionController.getQuestionDetail);

router.use(verifyToken);
router.post('/', QuestionController.createQuestion);
router.put('/:questionId', QuestionController.updateQuestion);
router.delete('/:questionId', QuestionController.deleteQuestion);

module.exports = router;