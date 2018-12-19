const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer')
const Helper = require('../helpers/helper')


class QuestionController {

  static create (req, res) {
    Question
      .create({
        title : req.body.title,
        content : req.body.content,
        owner : req.user.id,
      })
      .then(question => {
        return Question
          .updateOne({
            _id: question._id
          }, {
            $addToSet: { 
              tags: {
                $each: req.body.tags
              }
            }
          })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      }) 
  }

  static read (req, res) {
    Question
      .find({})
      .populate('owner', "-password")
      .then(data => {
        res.status(200).json(data)
      })
      .populate('owner', "-password")
      .catch(err => {
        res.status(500).json(err)
      }) 
  }

  static readById (req, res) {
    Question
      .findById(req.params.id)
      .populate('owner', "-password")
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          err : err,
          msg : 'Invalid id Question'
        })
      })
  }

  static readBySlug(req, res) {
    Question
      .findOne({
        slug: req.params.slug
      })
      .populate('owner', '-password')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          err : err
        })
      })
  }

  static readByOwnerId (req, res) {
    Question
      .find({
        owner: req.user.id
      })
      .populate('owner', "-password")
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static getQuestionByTag(req, res) {
    Question
      .find({
        tags: req.params.tag
      })
      .populate('owner', "-password")
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getAllTags(req, res) {
    Question
      .find({})
      .then(questions => {
        let tags = []
        questions.forEach(question => {
          tags = [...tags, ...question.tags]
        })
        tags = Array.from(new Set(tags))
        res.status(200).json(tags)
      }) 
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static delete (req, res) {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        return new Promise((resolve, reject) => {
          if (data.owner.equals(req.user.id)) {
            Answer.deleteMany({question:req.params.id})
            resolve() 
          } else {
            reject({msg : 'Access Unauthorized'})
          }
        })
      })
      .then(() => {
        Question
          .deleteOne({
            _id : req.params.id
          })
          .then(data => {
            res.status(200).json({
              msg : 'delete success',
              data : data
            })
          })
          .catch(err => {
            res.status(500).json({
              msg : 'delete failed',
              err : err
            })
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update (req, res) {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        return new Promise((resolve, reject) => {
          if(data.owner.equals(req.user.id)) {
            data.title = req.body.title;
            data.content = req.body.content; 
            data.save()
            resolve()
          } else {
            reject('access unauthorized')
          }
        })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static upvote(req, res) {
    Question
      .findById(req.params.questionId)
      .then(question => {
        if(question.owner.equals(req.user.id)) {
          res.status(400).json({
            msg : 'you cannot upvote your own question'
          })
        } else {
          let downvoteAlready = (question.downvotes.indexOf(req.user.id) !== -1);
          let upvoteAlready = (question.upvotes.indexOf(req.user.id) !== -1);
          if (!downvoteAlready && !upvoteAlready) {
            return question
              .update({
                $push : {
                  upvotes: req.user.id
                }
              })
              .then(data => {
                return Helper.getCurrentUser(question.owner)
                })
              .then((user) => {
                let newPopularity = Number(user.popularity) + 1
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then((data) => {
                res.status(200).json(data)
              })
          } else if (downvoteAlready) {
            return question
              .update({
                $pull : {
                  downvotes : req.user.id
                }
              })
              .then(data => {
                return question.update({
                  $push : {
                    upvotes: req.user.id
                  }
                })
              })
              .then(result => {
                return Helper.getCurrentUser(question.owner)
              })
              .then(user => {
                let newPopularity = Number(user.popularity) + 2
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then(data => {
                res.status(200).json({
                  msg : 'upvote success',
                  data: data
                })
              })
          } else if (upvoteAlready) {
            question
              .update({
                $pull : {
                  upvotes : req.user.id
                }
              })
              .then(data => {
                return Helper.getCurrentUser(question.owner)
              })
              .then(user => {
                let newPopularity = user.popularity - 1
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then(data => {
                res.status(200).json({
                  msg : 'removing upvotes success'
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

  static downvote(req, res) {
    Question
      .findById(req.params.questionId)
      .then(question => {
        if(question.owner.equals(req.user.id)) {
          res.status(400).json({
            msg : 'you cannot downvote your own post'
          })
        } else {
          let downvoteAlready = (question.downvotes.indexOf(req.user.id) !== -1);
          let upvoteAlready = (question.upvotes.indexOf(req.user.id) !== -1);
          if (!downvoteAlready && !upvoteAlready) {
            question
              .update({
                $push : {
                  downvotes : req.user.id
                }
              })
              .then(data => {
                return Helper.getCurrentUser(question.owner)
              })
              .then(user => {
                let newPopularity = user.popularity - 1
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then(data => {
                res.status(200).json({
                  msg : 'downvote success'
                })
              })
              .catch(err => {
                res.status(500).json(err)
              })
          } else if (upvoteAlready) {
            question
              .update({
                $pull : {
                  upvotes : req.user.id
                }
              })
              .then(data => {
                return question.update({
                  $push : {
                    downvotes : req.user.id
                  }
                })
              })
              .then(() => {
                return Helper.getCurrentUser(question.owner)
              })
              .then(user => {
                let newPopularity = user.popularity - 2
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then(data => {
                res.status(200).json({
                  msg : 'downvote success'
                })
              })
              .catch(err => {
                res.status(500).json(err)
              })
          } else if (downvoteAlready) {
            question
              .update({
                $pull : {
                  downvotes : req.user.id
                }
              })
              .then(() => {
                return Helper.getCurrentUser(question.owner)
              })
              .then(user => {
                let newPopularity = Number(user.popularity) + 1
                return Helper.changeUserPopularity(user, newPopularity)
              })
              .then(data => {
                res.status(200).json({
                  msg : 'remove downvote'
                })
              })
              .catch(err => {
                res.status(500).json(err)
              })
          }
        }
      })
  }
  
  }
  
  module.exports = QuestionController;

