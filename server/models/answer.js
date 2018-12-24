const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    body: String,
    date: String,
    upvote: [],
    downvote: []
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer