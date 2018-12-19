var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.js');
const upload = require('../middlewares/multer.js');
const { isUser } = require('../middlewares/isUser.js');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/check-token', UserController.checkToken);
router.get('/popularity', UserController.popularity);

router.get('/:userId', UserController.readOne);
router.put('/:userId', isUser, upload.single('filetarget'), UserController.update);

module.exports = router;