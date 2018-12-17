const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  content: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  posted_at: Date,
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;