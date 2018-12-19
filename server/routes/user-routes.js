const router = require('express').Router()

const { isLogin, isTokenStillValid } = require('../midleware/authenticate')

const { register, clearAll, signin, updateUser, readUser, popular, gsignin } = require('../controllers/user')

const multer = require('multer')
const upload = multer({
    storage : multer.MemoryStorage
})
const uploadToGcp = require('../midleware/image')

router.get('/', isLogin,isTokenStillValid, readUser)
router.get('/popular',isLogin,isTokenStillValid,popular)
router.post('/g-login', gsignin)
router.post('/register',upload.single('avatar'),uploadToGcp,register)
router.post('/signin', signin)
router.put('/',isLogin,isTokenStillValid, updateUser)


module.exports = router