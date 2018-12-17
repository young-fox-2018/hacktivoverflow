const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Fill the question title so people can understand what you ask.']
  },
  content: {
    type: String,
    required: [true, 'If the content is empty, then what are you trying to ask?']
  },
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  posted_at: Date,
  updated_at: Date,
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;