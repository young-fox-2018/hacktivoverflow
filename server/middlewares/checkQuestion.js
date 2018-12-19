const Question = require('../models/Question')

module.exports = {
    checkOwner: function(req, res, next) {
        console.log('masukk siniiii')
        console.log(req.params.id)
        Question
            .findOne({ _id: req.params.id })
            .then((data) => {
                if(String(data.userId) === String(req.currentUser._id)) {
                    next()
                } else {
                    res.status(401).json({
                        msg: `Invalid access`
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: `Please sign in first!`
                })
            })
    },
    checkNotOwner: function(req, res, next) {
        Question
            .findOne({ _id: req.params.id })
            .then((data) => {
                if (String(data.userId) !== String(req.currentUser._id)){
                    next()
                    console.log(data)
                } else {
                    res.status(401).json({
                        msg: `Invalid access`
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: `Question not found`
                })
            })
    }
}