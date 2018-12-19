var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: {
        type:String,
        unique: true
    },
    body: String,
    createdAt: {type: String, default: new Date()},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    upvote: [],
    downvote: [],
    tags: [],
    status: Boolean,
    closed:String,
    slug: String
})

let question = mongoose.model('Question', questionSchema)

module.exports = question