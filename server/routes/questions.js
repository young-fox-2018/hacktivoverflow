var express = require('express');
var router = express.Router();
const {verToken} = require('../middlewares/verToken')
const {allQuestions, newQuestion, myQuestions, delQuestion, oneQuestion, updQuestion, updVote} = require('../controllers/questionController')

router.get('/', allQuestions);
router.post('/', verToken, newQuestion);
router.get('/self', verToken, myQuestions);
router.patch('/vote/:qId', verToken, updVote)
router.get('/:qId', oneQuestion)
router.patch('/:qId', verToken, updQuestion);
router.delete('/:qId', verToken, delQuestion);

module.exports = router;