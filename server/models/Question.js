const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String, 
    required: [true, 'cannot post blank title question']
  },
  body: {
    type: String, 
    required: [true, 'cannot post blank body question']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  voteUp: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  voteDown: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: String(new Date())
  },
  updatedAt: {
    type: Date,
    default: String(new Date())
  }

})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question