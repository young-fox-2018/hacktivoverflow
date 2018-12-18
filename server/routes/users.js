var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js")
const {isLoggedIn} = require('../middlewares/authentication')

/* GET users listing. */

router.post("/", usersController.create)
router.post("/signIn", usersController.signIn)

module.exports = router;