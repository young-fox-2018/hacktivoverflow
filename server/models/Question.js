const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title of question is required']
  },
  description: {
    type: String,
    required: [true, 'Description of question is required']
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
    default: 0,
    ref: 'User'
  },
  userId:{
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  answerId: [{
    type: ObjectId,
    default: [],
    ref: 'Answer'
  }],
  createdDate: {
    type: Date
  }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;