var express = require('express');
var router = express.Router();
const Controller = require('../controllers/user')
const upload = require('../helpers/img')
const middleware = require('../middleware/index')

/* GET users listing. */
router.post('/register', upload.multer.single('img'), upload.GCS, Controller.register)
router.post('/login', Controller.login)
router.get('/top',Controller.getTop)
router.get('/', middleware.checkLogin, Controller.checkLogin)

module.exports = router;