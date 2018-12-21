var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController')

router.post('/', questionController.newQuestion)
      .get('/', questionController.getAll)
      .get('/', questionController.getOne)
      .put('/', questionController.updateQuestion)
      .delete('/', questionController.delete)

module.exports = router;