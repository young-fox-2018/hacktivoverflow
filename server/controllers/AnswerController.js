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
}

module.exports = Controller