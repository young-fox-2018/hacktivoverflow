var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")
const { isLogin } = require("../middleware/validate")
/* GET home page. */

router.post("/login", userController.user_login)
router.post("/glogin", userController.glogin)
router.post("/register", userController.user_register)
router.get("/", isLogin, userController.isLogin)

module.exports = router;