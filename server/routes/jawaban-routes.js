const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeJawaban } = require('../midleware/authenticate')

const {  findJawaban, deleteJawaban , updateJawaban, create, upvote, downvote } = require('../controllers/jawaban')

Router.post('/', isLogin, isTokenStillValid, create)
Router.get('/:id_jawaban',isLogin,isTokenStillValid, findJawaban)
Router.delete('/:id',isLogin,isTokenStillValid,isAuthorizeJawaban, deleteJawaban)
Router.put('/:id', isLogin,isTokenStillValid, isAuthorizeJawaban, updateJawaban)
Router.put('/upvote/:id', isLogin, isTokenStillValid, upvote)
Router.put('/downvote/:id', isLogin, isTokenStillValid, downvote)
module.exports = Router