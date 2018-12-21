const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote: [{
        type: String,
        required: true
    }],
    downvote: [{
        type: Schema.types.ObjectId,
        required: true
    }],
    vote: {
        type: Number,
        default: 0
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer