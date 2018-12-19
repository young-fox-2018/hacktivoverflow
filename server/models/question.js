const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const questionSchema = new Schema({ 
    title: {
        type: String,
        required: [true, 'title must be filled']
    },
    detail: {
        type: String,
        required: [true, 'detail must be filled']
    },
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    upvote: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    downvote: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    tag: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Tag'
    }]
}, {
    timestamps: true
}) 


const Question = mongoose.model('Question', questionSchema)

module.exports = Question;