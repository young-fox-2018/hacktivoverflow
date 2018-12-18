const Question = require('../models/question.js')
const User = require('../models/user')
const Answer = require('../models/answer.js')
const moment = require('moment')

class Controller {
    static viewAnswers(req, res) {
        Answer
            .find()
            .populate("question")
            .populate("poster")
            .populate("votes")
            .then((data) => {
                res.status(200).json({ message: 'Data retrieval success', data: data })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static addAnswer(req, res) {
        Answer
            .create(
                {
                    title: req.body.title,
                    description: req.body.description,
                    question: req.body.questionId,
                    poster: req.user._id,
                    createdDate: moment().format('MMM Do YYYY')
                }
            )
            .then((data) => {
                //add answer to question "answers" propertiy
                return Question
                        .findOne(
                            {
                                _id: req.body.questionId
                            }
                        )
                        .then((question) => {
                            let newAnswerQuestion = question.answers.slice()
                            newAnswerQuestion.push(data)
                            return Question
                                        .updateOne(
                                            {
                                                _id: req.body.questionId
                                            },
                                            {
                                                $set: {
                                                    answers: newAnswerQuestion
                                                }
                                            }
                                        )
                                        .then (() => {
                                            //add answer to "User" Model
                                            let newAnswerUser = req.user.answers.slice()
                                            newAnswerUser.push(data)
                                            return User
                                                    .updateOne(
                                                        {
                                                            _id: req.user._id
                                                        },
                                                        {
                                                            $set: {
                                                                answers: newAnswerUser
                                                            }
                                                        }
                                                    )
                                                    .then(() => {
                                                        res.status(201).json({ message: "Answer successfully created"})
                                                    })
                                        })
                        })
            })
            .catch(err=> {
                res.status(500).json({message: err.message})
            })
    }
    static editAnswer(req, res) {
        Answer
            .findOneAndUpdate(
                {
                    _id: req.body.answerId
                },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description
                    }
                }
            )
            .then((data) => {
                res.status(200).json({message: "Answer successfully edited", data:data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }  
    static vote(req, res) {
        //see if the user Id already exist in "votes" property of Question
        Answer
            .findOne(
                {
                    _id: req.body.answerId
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
                       Answer
                       .findOneAndUpdate(
                           {
                               _id: req.body.answerId
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
                        Answer
                       .findOneAndUpdate(
                           {
                               _id: req.body.answerId
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
                    if (String(data.poster) == req.user._id) {
                        res.status(400).json({ message: "You can't vote on your own post!" })
                    //if voter is not the post maker
                    } else {
                        let newVote = {
                            userId: req.user._id,
                            vote: req.body.vote
                        }
                        newVoteList.push(newVote)
                        Answer
                            .findOneAndUpdate(
                                {
                                    _id: req.body.answerId
                                },
                                {
                                    votes: newVoteList
                                }
                            )
                            .then((response) => {
                                res.status(201).json({ message: "Vote successfully added" })
                            })
                    }

                }

            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = Controller