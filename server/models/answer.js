const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: String,
        required: [true, "answer can't be blank"]
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    question_id: {
        type: Schema.Types.ObjectId, ref: "Question"
    },
    vote: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: {
        type: String
    },

})

const Answer = mongoose.model("Answer", answerSchema)
module.exports = Answer