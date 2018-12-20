const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeArticle } = require('../midleware/authenticate')

const { read , findPertanyaan, clearAll, create , updatePertanyaan, add_jawaban, remove, upvote, downvote, readTag,searchTag, popular} = require('../controllers/pertanyaan')

Router.get('/', read)
Router.post('/',isLogin,isTokenStillValid,create)
Router.put('/upvote/:id_pertanyaan',isLogin, isTokenStillValid, upvote )
Router.put('/downvote/:id_pertanyaan',isLogin, isTokenStillValid, downvote )
Router.get('/read-tag', readTag)
Router.get('/search-tag', searchTag)
Router.get('/popular',popular)
Router.put('/:id_pertanyaan', isLogin,isTokenStillValid, isAuthorizeArticle, updatePertanyaan)
Router.delete('/:id_pertanyaan',isLogin,isTokenStillValid, isAuthorizeArticle,remove)
Router.get('/:id_pertanyaan',isLogin,isTokenStillValid, findPertanyaan)
module.exports = Router