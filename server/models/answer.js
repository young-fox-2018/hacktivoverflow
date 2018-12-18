var mongoose = require('mongoose')

var Schema = mongoose.Schema

var answerSchema = new Schema({
    message : {
        type : String,
        required : true
    },
    upVote: [{
        type : Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downVote: [{
        type : Schema.Types.ObjectId, 
        ref: 'User'
    }],
    userId : { type : Schema.Types.ObjectId, ref: 'User'},
    questionId : { type : Schema.Types.ObjectId, ref: 'Question'},
    createdAt : { 
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer