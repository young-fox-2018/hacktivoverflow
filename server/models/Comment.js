const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        minlength: 5
    },
    commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment