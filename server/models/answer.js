var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let answerSchema = new Schema({
    word: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref:'Question'
    },
    upvote: [],
    downvote: []
})

let answer = mongoose.model('Answer', answerSchema)

module.exports = answer