
const Question = require('../models/Question')

class isOwner{

    static question(req,res,next){
        
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                if(question.author == req.currentUser.id){
                    next()
                } else {
                    res.status(403).json({
                        message: 'Forbidden'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }
    
    static voteQuestion(req,res,next){
        
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                if(question.author == req.currentUser.id){
                    res.status(400).json({errors: {
                        vote: {
                            message: 'Cannot Vote your own question'
                        }
                    }})
                } else {
                    next()
                }
            })
            .catch(err=>{
                res.status(500).json({message:'Internal Server Error'})
            })
    }
    
}

module.exports= isOwner