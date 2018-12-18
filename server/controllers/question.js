const Question = require('../models/question.js')
const User = require('../models/user')
const Answer = require('../models/answer.js')
const moment = require('moment')

class Controller {
    static viewQuestions(req, res) {
        Question
            .find()
            .sort({_id: 'desc'})
            .populate("answers")
            .populate("op")
            .populate({
                path:'answers',
                populate: {
                    path:'poster'
                }
            })
            .then((data) => {
                res.status(200).json({ message: 'Data retrieval success', data: data })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static addQuestion(req, res) {
        let tag = []
        if(req.body.tags.length === 0) {
            tag = [{"text": "none", "tiClasses": ["valid"]}]
        } else {
            tag = req.body.tags
        }
        Question
            .create(
                {
                    title: req.body.title,
                    description: req.body.description,
                    op: req.user._id,
                    createdDate: moment().format('MMM Do YYYY'),
                    tags: tag
                }
            )
            .then((data) => {
                //add the question to the user's "questions" property
                let newQuestionsList = req.user.questions.slice()
                newQuestionsList.push(data)
                User
                    .updateOne(
                        {
                            _id: req.user._id
                        },
                        {
                            $set: {
                                questions: newQuestionsList
                            }
                        }
                    )
                    .then(() => {
                        res.status(201).json({ message: "Question successfully created", data: data })
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static deleteQuestion(req, res) {
        //1. Delete question from Question model
        Question
            .findOneAndRemove(
                {
                    _id: req.body.questionId
                }
            )
            .then((data) => {
                //2. Delete question from User model
                let newUserQuestion = req.user.questions.filter(question => question != req.body.questionId)
                return User
                    .updateOne(
                        {
                            _id: req.user._id
                        },
                        {
                            $set: {
                                questions: newUserQuestion
                            }
                        }
                    )
                    .then(() => {
                        //2. Delete question from Answer model 
                        return Answer
                            .deleteMany(
                                {
                                    question: req.body.questionId
                                }
                            )
                            .then(() => {
                                res.status(200).json({ message: "Question successfully deleted", data:data })
                            })
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static editQuestion(req, res) {
        Question
            .findOneAndUpdate(
                {
                    _id: req.body.questionId
                },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                    }
                },{new: true}
            )
            .then((data) => {
                return data
                        .save()
                        .then(() => {
                            res.status(200).json({ message: "Question successfully edited", data: data })
                        })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static vote(req, res) {
        //see if the user Id already exist in "votes" property of Question
        Question
            .findOne(
                {
                    _id: req.body.questionId
                }
            )
            .then((data) => {
                let alreadyVoted = false
                let alreadyVotedVote = {}
                let newVoteList = data.votes.slice()
                data.votes.forEach(element => {
                    if (String(element.userId) == req.user._id) {
                        alreadyVotedVote = element
                        alreadyVoted = true
                    }
                });
                //if user already voted
                if (alreadyVoted) {
                    //if the person 'votes' again (same vote number) delete/undo the vote
                    if(alreadyVotedVote.vote == req.body.vote) {
                       let undoVote = newVoteList.filter(vote => String(vote.userId) != req.user._id)
                       Question
                       .findOneAndUpdate(
                           {
                               _id: req.body.questionId
                           },
                           {
                               votes: undoVote
                           }
                       )
                       .then((response) => {
                           res.status(200).json({ message: "Vote successfully removed" })
                       })
                    //if the person 'votes' again (diff vote number) change the vote
                    } else {
                        newVoteList.forEach(vote => {
                            if(String(vote.userId) == req.user._id) {
                                vote.vote = req.body.vote
                            }
                        });
                        Question
                       .findOneAndUpdate(
                           {
                               _id: req.body.questionId
                           },
                           {
                               votes: newVoteList
                           }
                       )
                       .then((response) => {
                           res.status(200).json({ message: "Vote successfully changed" })
                       })
                    }

                //if user has not voted
                } else {
                    //check if the one voting is it own user 
                    if (String(data.op) == req.user._id) {
                        res.status(400).json({ message: "You can't vote on your own post!" })
                    //if voter is not the post maker
                    } else {
                        let newVote = {
                            userId: req.user._id,
                            vote: req.body.vote
                        }
                        newVoteList.push(newVote)
                        Question
                            .findOneAndUpdate(
                                {
                                    _id: req.body.questionId
                                },
                                {
                                    votes: newVoteList
                                }
                            )
                            .then((response) => {
                                res.status(201).json({ message: "Vote successfully added", data:response, votes: newVoteList })
                            })
                    }

                }

            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static getTags(req, res) {
        Question
            .find({})
            .then(questions => {
                let tags = []
                questions.forEach(question => {
                    question.tags.forEach(tag => {
                        tags.push(tag.text)
                    })
                })
                //sort unique tags  
                let uniqueTags = [...new Set(tags)]
                res.status(200).json(uniqueTags)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static filterbyTags(req, res) {
        Question
            .find({
                'tags.text': req.query.search
            })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = Controller