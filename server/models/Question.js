const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  title: {  
    type: String,
    required: true
  },
  author: String,
  content: {
    type:String
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question