const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const Auth = require('../middlewares/auth')
/* GET users listing. */
router.get('/topuser', UserController.getTopUser)
router.post('/', UserController.create)
router.post('/login', UserController.login)
router.post('/googleLogin', Auth.googleValidation, UserController.googleRegister)
module.exports = router;
