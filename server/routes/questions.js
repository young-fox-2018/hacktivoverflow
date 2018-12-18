const express = require('express')
const router = express.Router()
const   {loginAuth} = require('../middlewares/loginAuth'),
        questionController = require('../controllers/question')
        // images = require('../Middlewares/images')

router.get('/', questionController.findAll);
router.get('/mine', loginAuth, questionController.findByUser)
router.get('/:id', questionController.findById);
router.post('/', loginAuth, questionController.create);
router.put('/:id', loginAuth, questionController.update)
router.delete('/:id', loginAuth, questionController.delete);

module.exports = router; 