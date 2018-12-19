var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController')
/* GET users listing. */
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check', userController.check)
router.post('/gLogin', userController.gLogin)

module.exports = router;
