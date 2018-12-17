var express = require('express');
var router = express.Router();
const Controller = require('../controllers/user')
const upload = require('../helpers/img')

/* GET users listing. */
router.post('/register', upload.multer.single('img'), upload.GCS, Controller.register)
router.post('/login', Controller.login)

module.exports = router;