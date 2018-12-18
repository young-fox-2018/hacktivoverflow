const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: String,
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    tags: [String],
})

let Question = mongoose.model("Question", questionSchema)

module.exports = Question