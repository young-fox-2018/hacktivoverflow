const Question = require("../models/question")

module.exports = {
    addQuestion: (req, res) => {
        let newData = {
            question: req.body.question,
            user_id: req.body.user_id,
            createdAt: new Date()
        }
        Question.create(newData)
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
    getQuestion: (req, res) => {
        Question.find({})
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
    getOneQuestion: (req, res) => {
        Question.findOne({ _id: req.params.id })
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
            question: req.body.question,
            user_id: req.body.user_id,
            vote: req.body.vote
        }
        Question.updateOne({ _id: req.params.id }, newData)
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

    deleteQuestion: (req, res) => {


        Question.deleteOne({ _id: req.params.id })
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