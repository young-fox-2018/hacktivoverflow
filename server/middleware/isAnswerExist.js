const Answer = require('../models/answer.js')

function isAnswerExist(req, res, next) {
    Answer.findOne(
        {
            _id: req.body.answerId
        }
    )
    .then((data) => {
        if(data) {
            next()
        } else {
            res.status(400).json({message: "Answer does not exist"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
}

module.exports = isAnswerExist