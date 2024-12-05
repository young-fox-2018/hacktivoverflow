const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = Schema({
    userId:  {type: Schema.Types.ObjectId, ref: "User"},
    question: String,
    votes: Number,
    createdAt: Date,
    username: String,
    title: String
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;