const router = require('express').Router()
const Controller = require('../controllers/answer.js')
const isExist = require('../middleware/isExist.js')
const isAuthorized = require('../middleware/isAuthorized.js')
const isQuestionExist = require('../middleware/isQuestionExist.js')
const isAnswerExist = require('../middleware/isAnswerExist.js')

router.get('/', Controller.viewAnswers)
router.post('/add', isExist, isQuestionExist, Controller.addAnswer)
router.put('/edit', isExist, isAuthorized, Controller.editAnswer)
router.post('/vote', isExist, isAnswerExist, Controller.vote)

module.exports = router