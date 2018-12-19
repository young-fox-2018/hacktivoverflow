const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, "question can't be blank"]
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    vote: [{ type: Schema.Types.ObjectId, ref: "User" }],

    createdAt: {
        type: String
    }
})

const Question = mongoose.model("Question", questionSchema)
module.exports = Question