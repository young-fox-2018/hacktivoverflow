const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication } = require('../middlewares')

router.get('/', authentication, userController.info);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/gsignin', userController.gSignIn);

module.exports = router;
