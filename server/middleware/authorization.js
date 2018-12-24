const Question = require('../models/question')
const Answer = require('../models/answer')
const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

module.exports = {
    questionOwnerCheck(req, res, next) {
        Question.findOne({user: req.params.userId})
            .then(question => {
                if (String(question.user) == String(req.currentUser._id)) {
                    next()
                }
                else {
                    res.status(400).json({msg: 'Access denied'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    questionOwnerCheck2(req, res, next) {
        Question.findOne({_id: req.params.questionId})
            .then(question => {
                if (String(question.user) == String(req.currentUser._id)) {
                    next()
                }
                else {
                    res.status(400).json({msg: 'Access denied'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    upvoteDownvoteRight(req, res, next) {
        Question.findOne({_id: req.params.questionId})
            .then(question => {
                if (String(question.user) !== String(req.currentUser._id)) {
                    next()
                }
                else {
                    res.status(400).json({msg: 'You are not allowed to upvote or downvote your self'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    answerOwnerCheck(req, res, next) {
        Answer.findOne({_id: req.params.answerId})
            .then(answer => {
                if (String(answer.user) == String(req.currentUser._id)) {
                    next()
                }
                else {
                    res.status(400).json({msg: 'Access denied'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    upvoteDownvoteAnswerRight(req, res, next) {
        Answer.findOne({_id: req.params.answerId})
            .then(answer => {
                if (String(answer.user) !== String(req.currentUser._id)) {
                    next()
                }
                else {
                    res.status(400).json({msg: 'You are not allowed to upvote or downvote your self'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },

    gLogin(req, res, next) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    req.login = user
                    next()
                } 
                else {
                    async function verify() {
                        const ticket = await client.verifyIdToken({
                            idToken: req.headers.token,
                            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                            // Or, if multiple clients access the backend:
                            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                        });
                        const payload = ticket.getPayload()
                        const userid = payload['sub']
                        req.gLogin = payload
                        // console.log(payload)
                        next()
                        // If request specified a G Suite domain:
                        //const domain = payload['hd'];
                      }
                      verify().catch(console.error)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}