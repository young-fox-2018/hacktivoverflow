const Question = require('../models/Question')

class questionController {
  static create(req, res) {
    // res.json('test create')
    let {title, description} = req.body
    Question.create({
      title,
      description,
      userId: req._currentUser._id,
      createdDate: new Date()
    })
      .then((result_quest) => {
        res.status(200).json(result_quest)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static findAll(req, res) {
    // res.json('test findAll')
    Question.find({}).populate('userId').sort('-createdDate')
      .then((result_quest) => {
        res.status(200).json(result_quest)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static findMy (req, res) {
    let userId = req._currentUser._id

    Question.find({
      userId: userId
    }).populate('userId').sort('-createdDate')
      .then((result_quest) => {
        res.status(200).json(result_quest)        
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static findOne(req, res) {
    // res.json('test findOne')
    let id = req.params.questionId
    Question.findOne({
      _id: id
    }).populate('userId')
    .then((result_quest) => {
      res.status(200).json(result_quest)      
    }).catch((err) => {
      res.status(400).json({
        message: err.message
      })
    });
  }

  static update(req, res) {
    // res.json('test update')
    let {title, description} =  req.body
    let id = req.params.questionId
    Question.findOneAndUpdate({
      _id: id
    }, { 
      $set: {
        title,
        description
      }
    }, {
      new: true,
      runValidators: true
    })
      .then((result_quest) => {
        res.status(200).json(result_quest)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
  
  static delete(req, res) {
    // res.json('test delete')
    let id = req.params.questionId;
    Question.findOneAndDelete({
      _id: id
    })
      .then((result_quest) => {
        res.status(200).json(result_quest)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }

  static upVote(req, res) {
    let questionId = req.params.questionId;
    let userId = req._currentUser._id
    // res.json('test upvote')

    Question.findOne({
      _id: questionId,
      downVote: userId
    })
    .then((result_quest) => {
      if (result_quest) {
        return Question.findOneAndUpdate({
          _id: questionId
        }, {
          $pull: {downVote: userId},
          $inc: {voted: 1}
        }, {
          new: true
        })
      } else {
        return null
      }
    })
    .then((result_quest) => {
      return Question.findOne({
        _id: questionId,
        upVote: userId
      })
    })
    .then((result_quest) => {
      if (result_quest) {
        // res.json('udah ada')
        return Question.findOneAndUpdate({
          _id: questionId
        }, {
          $pull: {upVote: userId},
          $inc: {voted: -1}
        }, {
          new: true
        })
      } else {
        // res.json('belum ada')
        return Question.findOneAndUpdate({
          _id: questionId,
        }, {
          $push: {upVote: userId},
          $inc: {voted: 1}
        }, {
          new: true
        })
      }
    })
    .then((result_quest) => {
      res.status(200).json(result_quest)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message
      })
    });
  }

  static downVote(req, res) {
    let questionId = req.params.questionId;
    let userId = req._currentUser._id
    
    Question.findOne({
      _id: questionId,
      upVote: userId
    })
    .then((result_quest) => {
      if (result_quest) {
        return Question.findOneAndUpdate({
          _id: questionId
        }, {
          $pull: {upVote: userId},
          $inc: {voted: -1}
        }, {
          new: true
        })
      } else {
        return null
      }
    })
    .then((result_quest) => {
      return Question.findOne({
        _id: questionId,
        downVote: userId
      })
    })
    .then((result_quest) => {
      if (result_quest) {
        // res.json('udah ada')
        return Question.findOneAndUpdate({
          _id: questionId
        }, {
          $pull: {downVote: userId},
          $inc: {voted: 1}
        }, {
          new: true
        })
      } else {
        // res.json('belum ada')
        return Question.findOneAndUpdate({
          _id: questionId,
        }, {
          $push: {downVote: userId},
          $inc: {voted: -1}
        }, {
          new: true
        })
      }
    })
    .then((result_quest) => {
      res.status(200).json(result_quest)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message
      })
    });
  }
}

module.exports = questionController