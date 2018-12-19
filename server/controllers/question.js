const Question = require('../models/question.js');
const User = require('../models/user.js');

class QuestionController {

    static create(req, res) {
        Question.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user._id,
            tags: req.body.tags,
        })
            .then(function(result) {
                res.status(201).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static read(req, res) {
        Question.find()
            .sort({ updatedAt: -1 })
            .populate('user', '_id name email image')
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static readOne(req, res) {
        Question.findById({ _id: req.params.questionId })
            .populate('answers.user', '_id name email image')
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static update(req, res) {
        Question.findByIdAndUpdate({ _id: req.params.questionId }, {
            title: req.body.title,
            tags: req.body.tags,
            content: req.body.content,
        })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static delete(req, res) {
        Question.findByIdAndDelete({ _id: req.params.questionId })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static saveAnswer(req, res) {
        Question.findByIdAndUpdate({ _id: req.params.questionId }, {
            $push: { answers: { user: req.user._id, content: req.body.contentAnswer } }
        })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static updateAnswer(req, res) {
        Question.findOneAndUpdate(
            {
                _id: req.params.questionId,
                'answers._id': req.params.answerId,
            },
            {
                "answers.$.content": req.body.contentAnswer
            },
            {
                new: true,
            },
        )
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static upvoteQuestion(req, res) {
        Question.findOneAndUpdate(
            { _id: req.body.questionId },
            {
                $pull: { downvote: req.user._id },
                $push: { upvote: req.user._id }
            },
        )
            .then(function(result) {
                
            User.findOneAndUpdate({ _id: req.body.userQuestion }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });

            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static noUpvoteQuestion(req, res) {
        Question.findOneAndUpdate(
            { _id: req.body.questionId },
            {
                $pull: { upvote: req.user._id },
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userQuestion }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static downvoteQuestion(req, res) {
        Question.findOneAndUpdate(
            { _id: req.body.questionId },
            {
                $pull: { upvote: req.user._id },
                $push: { downvote: req.user._id }
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userQuestion }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static noDownvoteQuestion(req, res) {
        Question.findOneAndUpdate(
            { _id: req.body.questionId },
            {
                $pull: { downvote: req.user._id },
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userQuestion }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static upvoteAnswer(req, res) {
        Question.findOneAndUpdate(
            {
                _id: req.body.questionId,
                'answers._id': req.body.answerId,
            },
            {
                $pull: { "answers.$.downvote": req.user._id },
                $push: { "answers.$.upvote": req.user._id }
            },
        )
            .then(function(result) {
                User.findOneAndUpdate({ _id: req.body.userAnswer }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static noUpvoteAnswer(req, res) {
        Question.findOneAndUpdate(
            {
                _id: req.body.questionId,
                'answers._id': req.body.answerId,
            },
            {
                $pull: { "answers.$.upvote": req.user._id },
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userAnswer }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static downvoteAnswer(req, res) {
        Question.findOneAndUpdate(
            {
                _id: req.body.questionId,
                'answers._id': req.body.answerId,
            },
            {
                $pull: { "answers.$.upvote": req.user._id },
                $push: { "answers.$.downvote": req.user._id }
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userAnswer }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static noDownvoteAnswer(req, res) {
        Question.findOneAndUpdate(
            {
                _id: req.body.questionId,
                'answers._id': req.body.answerId,
            },
            {
                $pull: { "answers.$.downvote": req.user._id },
            },
        )
            .then(function(result) {
                
                User.findOneAndUpdate({ _id: req.body.userAnswer }, {
                    $inc : { popularity : req.body.popularity },
                })
                    .then(function(result2) {
                        res.status(200).json(result2);
                    })
                    .catch(function(error2) {
                        console.log(error2);
                        res.status(500).json(error2);
                    });
                    
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static allTag(req, res) {
        Question.find({})
            .distinct('tags.text')
           .then(function(result) {
                res.status(200).json(result);
           })
           .catch(function(error) {
                res.status(500).json(error);
           });
    }

    static searchTag(req, res) {
        Question.find({ 'tags.text' : req.params.text })
            .populate('user', '_id name email image')
            .then(function(result) {
                res.status(200).json(result);
           })
           .catch(function(error) {
                res.status(500).json(error);
           });
    }

};

module.exports = QuestionController;