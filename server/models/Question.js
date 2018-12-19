var mongoose = require('mongoose')
var Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title must be filled']
    },
    content: {
        type: String,
        required: [true, 'Content must be filled']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question