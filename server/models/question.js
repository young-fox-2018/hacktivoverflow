const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    body: String,
    date: String,
    answers: [],
    upvote: [],
    downvote: []
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question