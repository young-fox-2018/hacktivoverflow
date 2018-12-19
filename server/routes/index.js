var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const isLogin = require('../middlewares/isLogin')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/check-login', isLogin, UserController.checkLogin)

module.exports = router;
