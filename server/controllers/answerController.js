const Answer = require('../models/answer')
const Helper = require('../helpers/helper')

class AnswerController {

    static create (req, res) {
        Answer
            .create({
                content : req.body.content,
                owner : req.user.id,
                question : req.params.questionId
            })
            .then(data => {
                res.status(201).json({
                msg : 'answer created',
                answer : data
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static readAnswerFromQuestion (req, res) {
        Answer
            .find({
                question : req.params.questionId
            })
            .populate('owner', "-password")
            .then(data => {
                res.status(200).json({
                    answer : data
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update (req, res) {
        Answer
            .findById(req.params.answerId)
            .then(data => {
                if(data.owner.equals(req.user.id)) {
                    Answer
                        .update({
                            _id : req.params.answerId
                        }, {
                            '$set' : {
                                content : req.body.content
                            }
                        }, {
                            runValidators: true
                        })
                        .then(data => {
                            res.status(200).json({
                                msg : 'update answer success',
                                data : data
                            })
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }
                else {
                    res.status(500).json({
                        msg : 'Unauthorized access'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static upvote (req, res) {
        Answer
            .findById(req.params.answerId)
            .then(answer => {
                if(answer.owner.equals(req.user.id)) {
                    res.status(400).json({
                        msg : 'you cannot upvote your own answer'
                    })
                } else {
                    let downvoteAlready = (answer.downvotes.indexOf(req.user.id) !== -1);
                    let upvoteAlready = (answer.upvotes.indexOf(req.user.id) !== -1);
                    if (!downvoteAlready && !upvoteAlready) {
                        answer
                            .update({
                                $push : {
                                upvotes: req.user.id
                                }
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then(user => {
                                let newPopularity = Number(user.popularity) + 1
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .then(data => {
                                res.status(200).json(data)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    } else if (upvoteAlready) {
                        answer
                            .update({
                                $pull : {
                                upvotes: req.user.id
                                }
                            })
                            .then(data => {
                                res.status(200).json({
                                    data:data,
                                    msg: 'removing upvotes'
                                })
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then(user => {
                                let newPopularity = Number(user.popularity) - 1
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    } else if (downvoteAlready) {
                        answer
                            .update({
                                $pull : {
                                downvotes: req.user.id
                                }
                            })
                            .then(data => {
                                return answer.update({
                                    $push: {
                                        upvotes: req.user.id
                                    }
                                })
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then(user => {
                                let newPopularity = Number(user.popularity) + 2
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .then(data => {
                                res.status(200).json({
                                    msg : 'success upvote',
                                    data: data
                                })
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static downvote (req, res) {
        Answer
            .findById(req.params.answerId)
            .then(answer => {
                if(answer.owner.equals(req.user.id)) {
                    res.status(400).json({
                        msg : 'you cannot downvote your own answer'
                    })
                } else {
                    let downvoteAlready = (answer.downvotes.indexOf(req.user.id) !== -1);
                    let upvoteAlready = (answer.upvotes.indexOf(req.user.id) !== -1);
                    if (!downvoteAlready && !upvoteAlready) {
                        answer
                            .update({
                                $push : {
                                downvotes: req.user.id
                                }
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then((user) => {
                                let newPopularity = Number(user.popularity) - 1
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .then(data => {
                                res.status(200).json(data)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    } else if (downvoteAlready) {
                        answer
                            .update({
                                $pull : {
                                downvotes: req.user.id
                                }
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then((user) => {
                                let newPopularity = Number(user.popularity) + 1
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .then(data => {
                                res.status(200).json({
                                    data:data,
                                    msg: 'removing downvotes'
                                })
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    } else if (upvoteAlready) {
                        answer
                            .update({
                                $pull : {
                                upvotes: req.user.id
                                }
                            })
                            .then(data => {
                                return answer.update({
                                    $push: {
                                        downvotes: req.user.id
                                    }
                                })
                            })
                            .then(() => {
                                return Helper.getCurrentUser(answer.owner)
                            })
                            .then((user) => {
                                let newPopularity = Number(user.popularity) - 2
                                return Helper.changeUserPopularity(user, newPopularity)
                            })
                            .then(data => {
                                res.status(200).json({
                                    msg : 'success downvote',
                                    data: data
                                })
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = AnswerController