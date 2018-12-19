const mongoose = require('mongoose')

const answerSchema  = mongoose.Schema({
    body: {
        type: String,
        minlength: 10
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    upVoters : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    downVoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    accepted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const Answer = mongoose.model('Answer', answerSchema)

answerSchema.pre('update', function(next){
    this.updatedAt = new Date()
    next()
})

module.exports = Answer