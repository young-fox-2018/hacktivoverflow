const answerModel = require('../models/answer')
const questionModel = require('../models/question')
const newDate = require('../helpers/newDate')
const kue = require('kue')
const que = kue.createQueue()


class Controller {
    static add(req, res) {
        answerModel.create({
            userId: req.user._id,
            questionId: req.body.questionId,
            word: req.body.word
        })
            .then(data => {
                return questionModel.findOne({
                    _id: req.body.questionId
                })
                    .populate('userId')
            })
            .then(question => {
                if (req.user.email != question.userId.email) {
                    let date = newDate()
                    que.create('email', {
                        title: 'answer notification',
                        email: question.userId.email,
                        template: `Hi your question about <strong> ${question.title} </strong> was answered by <strong>${req.user.name}</strong> on ${date}`
                    }).save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                    res.status(201).json({ msg: 'success answer question' })
                } else {
                    res.status(201).json({ msg: 'success answer question' })
                }
            })
            .catch(err => {

            })
    }
    static update(req,res){
        answerModel.findOneAndUpdate({
            _id: req.params.id
        },{
            word: req.body.word
        }, {
            new: true
        })
        .then(updated => {
            res.status(202).json(updated)
        })
        .catch(err => {
            res.status(400).json(err)
        })

    }

    static getAnswer(req,res){
        let query = {}
        if (req.query){
            query = req.query
        }
        answerModel.find(query)
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = Controller