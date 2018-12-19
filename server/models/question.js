const mongoose = require('mongoose');
// https://www.npmjs.com/package/mongoose-slug-generator
const slug = require('mongoose-slug-generator');

const options = {
    separator: "-",
    lang: "en",
    truncate: 120,
};
mongoose.plugin(slug, options);

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String
    },
    slug: { type: String, slug: "title", unique: true },
    content: {
        type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    upvote: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    downvote: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    tags: {
        type: [{ text: { type: String } }],
        default: [],
    },
    answers: {
        type: [{
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            content: String,
            createdAt: { type: Date, default: new Date(), },
            upvote: { 
                type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
                default: [],
            },
            downvote: { 
                type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
                default: [],
            },
        }],
        default: [],
    },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;