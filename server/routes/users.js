var express = require('express')
var router = express.Router()

var userController = require('../controllers/userController')

var {loginCheck} = require('../middleware/authentication')

var {gLogin} = require('../middleware/authorization')

router.post('/register', userController.register)
router.post('/login', gLogin, userController.login)
router.use(loginCheck)
router.get('/', userController.findOne)

module.exports = router;
