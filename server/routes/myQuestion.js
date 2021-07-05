var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController')
var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin)

router.get('/', questionController.myQuestions)



module.exports = router