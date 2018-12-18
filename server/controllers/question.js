const questionModel = require('../models/question')
const getCloseDate = require('../helpers/closedDate')
const userModel = require('../models/user')
const dateNow = require('../helpers/newDate')
const genSlug = require('../helpers/genSlug')


class Controller {
    static addQuestion(req, res) {
        let tag = []
        if (req.body.tag) {
            tag = req.body.tag.split(' ')
        }
        questionModel.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.user._id,
            status: true,
            closed: getCloseDate(),
            tags: tag,
            slug: genSlug(req.body.title),
            createdAt: dateNow()
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static deleteQuestion(req, res) {
        questionModel.deleteOne({
            _id: req.params.id
        })
            .then(data => {
                res.status(202).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static updateQuestion(req, res) {
        let tag = []
        if (req.body.tag) {
            tag = req.body.tag.split(' ')
        }
        questionModel.findOneAndUpdate({
            _id: req.params.id
        }, {
                title: req.body.title,
                body: req.body.body,
                closed: getCloseDate(),
                tags: tag,
                slug: genSlug(req.body.title)
            }, {
                new: true
            })
            .then(data => {
                res.status(202).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static getAllQuestion(req, res) {
        let query = {}
        if (req.query){
            query=req.query
        }
        questionModel.find(query)
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static getUserQuestion(req, res) {
        questionModel.find({
            userId: req.user.id
        })
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static upvote(req, res) {
        questionModel.findOne({
            _id: req.params.id
        })
            .populate('userId')
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == req.user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == req.user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $push: { 'upvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation + 1
                                }, {
                                    new: true
                                })])
                } else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $pull: { 'upvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation - 1
                                }, {
                                    new: true
                                })])
                } else if (filteredup.length == 0 && filtereddown != 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $push: { 'upvote': req.user._id },
                                $pull: { 'downvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation + 2
                                }, {
                                    new: true
                                })])
                } else {
                    res.status(403).json({ errMsg: 'err' })
                }
            })
            .then(data => {
                res.status(202).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static downvote(req, res) {
        questionModel.findOne({
            _id: req.params.id
        })
            .populate('userId')
            .then(data => {
                let filteredup = data.upvote.filter(val => {
                    return val == req.user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == req.user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $push: { 'downvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation - 1
                                }, {
                                    new: true
                                })])
                } else if (filteredup.length == 0 && filtereddown.length != 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $pull: { 'downvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation + 1
                                }, {
                                    new: true
                                })])
                } else if (filteredup.length != 0 && filtereddown == 0) {
                    return Promise
                        .all([questionModel.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                                $push: { 'downvote': req.user._id },
                                $pull: { 'upvote': req.user._id }
                            }, {
                                new: true
                            }), userModel.findOneAndUpdate({
                                _id: data.userId._id
                            }, {
                                    reputation: data.userId.reputation - 2
                                }, {
                                    new: true
                                })])
                } else {
                    res.status(403).json({ errMsg: 'err' })
                }
            })
            .then(data => {
                res.status(202).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

module.exports = Controller