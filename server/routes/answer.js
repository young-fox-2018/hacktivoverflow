var express = require('express');
var router = express.Router();
const Controller = require('../controllers/answer')
const middleware = require('../middleware')

router.get('/',Controller.getAnswer)
router.use(middleware.checkLogin)
router.post('/', Controller.add)
router.put('/:id',middleware.checkUpdateAnswer, Controller.update)
router.post('/upvote/:id', middleware.checkVoteAnswer, Controller.upvote)
router.post('/downvote/:id', middleware.checkVoteAnswer, Controller.downvote)

module.exports = router;
