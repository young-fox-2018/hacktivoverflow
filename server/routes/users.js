var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const uploadImage = require('../helpers/uploadImage')

/* POST user signup.*/
router.post('/', uploadImage.multer.single('avatar'), uploadImage.sendUploadToGCS, userController.signUp)

/* POST user signin.*/
router.post('/sign', userController.signIn)

module.exports = router;
