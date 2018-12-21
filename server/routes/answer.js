var express = require('express');
var router = express.Router();
var answerController = require('../controllers/answerController')

router.post('/', answerController.newAnswer)
      .get('/', answerController.getAll)
      .put('/', answerController.updateAnswer)

module.exports = router;