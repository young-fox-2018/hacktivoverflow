const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const answerSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  upVote: [{
    type: ObjectId,
    default: []
  }],
  downVote: [{
    type: ObjectId,
    default: [],
    ref: 'User'
  }],
  voted: {
    type: Number,
    default: 0
  },
  userId:{
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  createdDate: {
    type: Date
  }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer