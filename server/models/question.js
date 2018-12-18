var mongoose = require('mongoose')

var Schema = mongoose.Schema

var questionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description: {
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
    createdAt : { 
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question