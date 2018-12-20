const express = require('express')
const router = express.Router()
const {login, register, loginFacebook} = require('../controllers/userController.js')

router
      .post('/login', login)
      .post('/fblogin', loginFacebook)
      .post('/register', register)

module.exports = router