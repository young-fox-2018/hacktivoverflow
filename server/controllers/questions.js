const Question = require("../models/Question")

module.exports = {
    create: function(req,res,next){
        Question.create({
            title: req.body.title,
            content: req.body.content,
            author: req.currentUser._id,
            tags: req.body.tag,
            created_at: new Date()
        }, function(err, response){
            if(err) {res.status(400).json({message: err.message})} 
            else {
                res.status(200).json({question: response, message: 'You successfully added a question'})
            }
        })
    },
    all: function(req,res,next){
        Question.find({})
        .populate('author')
        .then((question_docs) =>{
            res.status(200).json({questions: question_docs})
        })
        .catch((err) =>{
            res.status(400).json({message: err.message})
        })
    },
    detail: function(req,res,next){
        Question.findOne({
            _id:req.params.id
        })
        .populate('author')
        .then(question_docs =>{
            res.status(200).json({question: question_docs})
        })
        .catch(err =>{
            res.status(400).json({message: `The articles you are looking for doesn't exist`})
        })
    },
    update: function(req,res,next){
        let input = {
            title: req.body.title,
            content: req.body.content
        }
        Question.findByIdAndUpdate(
            req.params.id,
            {set: input},{new: true})
            .then(question_doc =>{
                res.status(200).json({
                    question: question_doc,
                    message: 'You successfully updated a question'
                })
            })
            .catch(err =>{
                res.status(400).json({message: err.message})
            })
    },
    delete: function(req,res,next){
        Question.findByIdAndRemove(
            req.params.id
        )
        .then(question_doc =>{
            res.status(200).json({
                question: question_doc,
                message: 'You successfully deleted a question'
            })
        })
        .catch(err =>{
            res.status(400).json({message: err.message})
        })
    }
}