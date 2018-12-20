var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.post('/', userController.signUp)
      .post('/', userController.signIn)
      .put('/', userController.update)
      .delete('/', userController.delete)

module.exports = router;
