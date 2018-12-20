const Question = require('../models/Question')
const {inputGen} = require('../helpers/inputGen')

module.exports = {
    allQuestions: function(req, res, next){
        Question.find({}, function(err, questions){
            if(err){
                res.status(500).json({
                    msg: "Errornya di allQuestions",
                    details: err.message
                })
            }
            else{
                res.status(200).json({
                    msg: "Here's all the questions posted!",
                    details: questions
                })
            }
        })
    },
    myQuestions: function(req, res, next){
        Question.find({userId: req.params.id}, function(err, questions){
            if(err){
                res.status(500).json({
                    msg: "Errornya di myQuestions",
                    details: err.message
                })
            }
            else{
                if(questions){
                    res.status(200).json({
                        msg: "Here's all the questions posted!",
                        details: questions
                    })
                }
                else{
                    res.status(404).json({
                        msg: "You haven't asked any question" 
                    })
                }
            }
        })
    },
    newQuestion: function(req, res, next){
        let input = {
            title: req.body.title,
            question: req.body.question,
            userId: req.userId,
            username: req.username,
            votes: 1,
            createdAt: new Date()
        }
        if(!req.body.question){
            res.status(500).json({
                msg:"Question cannot be empty"
            })
        }
        else{
            Question.create(input, function(err, question){
                if(err){
                    res.status(500).json({
                        msg: "Errornya di newQuestion",
                        details: err.message
                    })
                }
                else{
                    res.status(200).json({
                        msg: "Question successfully registered",
                        details: question
                    })
                }
            })
        }
    },
    oneQuestion: function(req, res, next){
        Question.findById( req.params.qId, function(err, question){
            if(err){
                res.status(500).json({
                    msg: "Errornya di oneQuestion",
                    details: err.message
                })
            }
            else{
                if(question){
                    res.status(200).json({
                        msg: "Here's the question You're searching for!",
                        details: question
                    })
                }
                else{
                    res.status(404).json({
                        msg: "The Question doesn't exist" 
                    })
                }
            }
        })
    },
    updQuestion: function(req, res, next){
        let input = inputGen(req.body.input)
        Question.findById(req.params.qId, function(err, question){
            if(err){
                res.status(500).json({
                    msg: "Errornya di updQuestion",
                    details: err.message
                })
            }
            else{
                if(question){
                    if(question.userId == req.userId){
                        Question.findByIdAndUpdate(question._id, input, function(err, question){
                            if(err){
                                res.status(500).json({
                                    msg: "Errornya di updQuestion",
                                    details: err.message
                                })
                            }
                            else{
                                res.status(200).json({
                                    msg: "You have successfully updated the Question"
                                })
                            }
                        })
                    }
                    else{
                        res.status(500).json({
                            msg: "You have no access!"
                        })
                    }
                }
                else{
                    res.status(404).json({
                        msg: "Question not found"
                    })
                }
            }
        })
    },
    updVote: function(req, res, next){
        Question.findById(req.params.qId, function(err, question){
            if(err){
                res.status(500).json({
                    msg: "Errornya di updVote",
                    details: err.message
                })
            }
            else{
                if(question){
                    if(question.userId != req.userId){
                        Question.findByIdAndUpdate(question._id, {votes: req.body.votes}, function(err, question){
                            if(err){
                                res.status(500).json({
                                    msg: "Errornya di updVote",
                                    details: err.message
                                })
                            }
                            else{
                                res.status(200).json({
                                    msg: "You have successfully Voted the Question"
                                })
                            }
                        })
                    }
                    else{
                        res.status(500).json({
                            msg: "You have no access!"
                        })
                    }
                }
                else{
                    res.status(404).json({
                        msg: "Question not found"
                    })
                }
            }
        })
    },
    delQuestion: function(req, res, next){
        Question.findById(req.params.qId, function(err, question){
            if(err){
                res.status(500).json({
                    msg: "Errornya di FindById delQuestion",
                    details: err.message
                })
            }
            else{
                if(question){
                    if(question.userId == req.userId){
                        Question.findByIdAndRemove(question._id,function(err, question){
                            if(err){
                                res.status(500).json({
                                    msg: "Errornya di delQuestion",
                                    details: err.message
                                })
                            }
                            else{
                                res.status(200).json({
                                    msg: "You have successfully deleted the Question"
                                })
                            }
                        })
                    }
                    else{
                        res.status(500).json({
                            msg: "You have no access!"
                        })
                    }
                }
                else{
                    res.status(404).json({
                        msg: "Question not found"
                    })  
                }
            }    
        })
    }
}