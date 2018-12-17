const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const questionModel = require('../models/question')
const answerModel = require('../models/answer')
require('dotenv').config()

class middleware {
    static checkLogin(req, res, next) {
        if (req.headers.token == undefined) {
            res.status(400).json({
                msg: 'unauthorized user'
            })
        } else {
            try {
                var user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            } catch (error) {
                res.status(400).json({
                    msg: 'wrong token'
                })
            }
            userModel.findOne({
                email: user.email
            })
                .then(data => {
                    if (data == null) {
                        res.status(400).json({
                            msg: 'unauthorize user'
                        })
                    } else {
                        req.user = user
                        next()
                    }
                })
        }
    }

    static checkDeleteQuestion(req, res, next) {
        questionModel.findOne({
            _id: req.params.id
        })
            .then(data => {
                if (data == null) {
                    res.status(401).json({
                        msg: 'no article found'
                    })
                } else {
                    if (data.userId != req.user._id) {
                        res.status(400).json({
                            msg: 'unauthorize user to do this feature'
                        })
                    } else {
                        next()
                    }
                }
            })
    }

    static checUpvoteQuest(req,res,next){
        questionModel.findOne({
            _id:req.params.id
        })
        .then(data => {
            if(data.userId == req.user._id){
                res.status(401).json({
                    msg: 'cant vote self'
                })
            } else{
                next()
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static checkUpdateAnswer(req,res,next){
        answerModel.findOne({
            _id: req.params.id
        })
        .then(answer => {
            if (answer.userId != req.user._id){
                res.status(401).json({
                    msg:'unauthorized user'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = middleware