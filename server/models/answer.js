const mongoose = require('mongoose')

const Schema = mongoose.Schema
const answerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        },
        vote: {
            type: Number,
        }
    }],
    createdDate: {
        type: String
    }
})

const Answer = mongoose.model('Answer', answerSchema, 'Answers')

module.exports = Answer