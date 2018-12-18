const Question = require('../models/question.js')

function isQuestionExist(req, res, next) {
    Question.findOne(
        {
            _id: req.body.questionId
        }
    )
    .then((data) => {
        if(data) {
            next()
        } else {
            res.status(400).json({message: "Question does not exist"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
}

module.exports = isQuestionExist