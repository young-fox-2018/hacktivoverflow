const router = require('express').Router()
const Controller = require('../controllers/question.js')
const isExist = require('../middleware/isExist.js')
const isAuthorized = require('../middleware/isAuthorized.js')
const isQuestionExist = require('../middleware/isQuestionExist.js')

router.get('/', Controller.viewQuestions)
router.get('/tags', Controller.getTags)
router.get('/tags/search?', Controller.filterbyTags)
router.use(isExist)
router.post('/add', isAuthorized, Controller.addQuestion)
router.delete('/delete', isAuthorized, Controller.deleteQuestion)
router.put('/edit', isAuthorized, Controller.editQuestion)
router.post('/vote', isQuestionExist, Controller.vote)


module.exports = router 