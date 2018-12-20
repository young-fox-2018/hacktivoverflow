var express = require('express');
var router = express.Router();
const {signUp, signIn, gSignIn} = require('../controllers/usersController.js')

router.post('/gSignIn', gSignIn);
router.post('/signUp', signUp);
router.post('/signIn', signIn);
module.exports = router;