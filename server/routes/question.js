var express = require('express');
var router = express.Router();
const Controller = require('../controllers/question')
const middleware = require('../middleware/index')

/* GET home page. */
router.get('/', Controller.getAllQuestion)

router.use(middleware.checkLogin)
router.post('/upvote/:id',middleware.checUpvoteQuest, Controller.upvote)
router.get('/users', Controller.getUserQuestion)
router.post('/', Controller.addQuestion)
router.put('/:id', Controller.updateQuestion)
router.delete('/:id', middleware.checkDeleteQuestion, Controller.deleteQuestion)

module.exports = router;
