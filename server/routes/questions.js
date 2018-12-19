const Auth = require('../middlewares/auth');
var express = require('express');
var router = express.Router();
const QuestionController = require('../controllers/questionController');


//Pengecekan auth is owner ada langsung di QuestionController
router.post('/',  Auth.isLogin, QuestionController.create);
router.get('/',  QuestionController.read);
router.get('/mypost', Auth.isLogin, QuestionController.readByOwnerId);
router.get('/tag', QuestionController.getAllTags);
router.get('/slug/:slug', QuestionController.readBySlug)
router.get('/:id', QuestionController.readById);
router.get('/tag/:tag', QuestionController.getQuestionByTag);
router.delete('/:id', Auth.isLogin, QuestionController.delete);
router.put('/:id', Auth.isLogin, QuestionController.update);
router.patch('/upvote/:questionId', Auth.isLogin, QuestionController.upvote);
router.patch('/downvote/:questionId', Auth.isLogin, QuestionController.downvote);
//Pengecekan auth is owner ada langsung di QuestionController

module.exports = router;
