const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    author: {
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
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'answer'
    }],
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    vote: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question