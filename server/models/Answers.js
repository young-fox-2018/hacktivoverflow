var mongoose = require('mongoose')
var Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Comment must be filled']
    },
    questionId: {
        type: Schema.Types.ObjectId, 
        ref: 'Question'
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

var Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer