var express = require('express');
var router = express.Router();
const indexController = require('../controllers/')
// const {googleCheck} = require('../middlewares/loginAuth')

/* GET home page. */
router.post('/login', indexController.login)
router.post('/googlesignin', indexController.loginGoogle)
router.post('/register', indexController.register)

module.exports = router;
