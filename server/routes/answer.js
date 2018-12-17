var express = require('express');
var router = express.Router();
const Controller = require('../controllers/answer')
const middleware = require('../middleware')

router.get('/',Controller.getAnswer)
router.use(middleware.checkLogin)
router.post('/', Controller.add)
router.put('/:id',middleware.checkUpdateAnswer, Controller.update)
router.post('upvote/:id')
router.post('downvote/:id')

module.exports = router;
