var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: String,
    body: String,
    createdAt: {type: Date, default: new Date()},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    upvote: [],
    downvote: [],
    tags: [],
    status: Boolean,
    closed:String
})

let question = mongoose.model('Question', questionSchema)

module.exports = question