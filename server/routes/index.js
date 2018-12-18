var express = require('express');
var router = express.Router();
const indexController = require('../controllers/')

/* GET home page. */
router.post('/login', indexController.login)
router.post('/register', indexController.register)

module.exports = router;
