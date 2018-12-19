var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.findOne);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;

