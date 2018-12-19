var express = require('express');
var router = express.Router();
const TagController = require('../controllers/TagController')
const isLoggedIn = require('../middlewares/isLoggedIn')


router.post('/', isLoggedIn, TagController.create)
router.get('/', TagController.readAll)


module.exports = router