const Answer = require("../models/answer")

module.exports = {
    addAnswer: (req, res) => {
        let newData = {
            answer: req.body.answer,
            user_id: req.body.user_id,
            question_id: req.body.question_id,
            createdAt: new Date()
        }
        console.log(newData);

        Answer.create(newData)
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    getAnswer: (req, res) => {
        Answer.find({})
            .then((result) => {
                res.status(200).json({
                    result
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    getOneAnswer: (req, res) => {
        Answer.find({ question_id: req.params.id })
            .populate("user_id")
            .then((result) => {
                res.status(200).json({
                    result
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    vote: (req, res) => {
        let newData = {
            answer: req.body.answer,
            user_id: req.body.user_id,
            question_id: req.body.question_id,
            vote: req.body.vote
        }
        Answer.updateOne({ _id: req.params.id }, newData)
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    deleteAnswer: (req, res) => {
        Answer.deleteOne({ _id: req.body.Answer_id })
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                res, status(400).json({
                    err
                })
            });
    }

}