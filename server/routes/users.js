var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController')
const isLoggedIn = require('../middlewares/isLoggedIn')

/* GET users listing. */
router.get('/', UserController.allUsers)
router.get('/topUsers', UserController.getTopUsers)

module.exports = router;
