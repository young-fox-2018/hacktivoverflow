const Answer = require('../models/Answer')

class Controller {
    static create(req,res){
        Answer.create({
            body: req.body.body,
            author: req.currentUser.id
        })
            .then(answer=> {
                res.status(201).json(answer)
            })
            .catch(err=> {
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static show(req,res){
        Answer.findOne({
            _id: req.params.id
        })
            .populate({path: 'author', select: ['_id', 'name', 'reputation']})
            .then(answer=> {
                res.status(200).json(answer)
            })
            .catch(err=> {
                res.status(400).json({errors: {answer: {message: err.message}}})
            })
    }

    static update(req,res){
        Answer.findOneAndUpdate({
            _id: req.params.id
        }, {
            body: req.body.body,
        }, {new: true})
            .then(updatedAnswer=> {
                res.status(200).json(updatedAnswer)
            })
            .catch(err=>{
                res.status(400).json({errors: {answer: {message: err.message}}})
            })
    }
}

module.exports = Controller