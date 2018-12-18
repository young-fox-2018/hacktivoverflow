const mongoose = require('mongoose')
const Answer = require('./answer.js')
const User = require('./user.js')

const Schema = mongoose.Schema
const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    op: { //Original Poster
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        },
        vote: {
            type: Number,
        }
    }],
    createdDate: {
        type: String
    },
    tags: [{
        text: {
            type: String
        },
        tiClasses: [String]
    }],
    slug: {
        type: String
    }
})

questionSchema.pre('save', function(next) {
    if(this.title[this.title.length-1] !== '?') {
        this.title = this.title + '?'
    }

    let noSpecial = this.title.replace(/[^a-zA-Z0-9 ]/g,'')
    let trim = noSpecial.trim()
    let slug = trim.split(' ').join('-').toLowerCase()
    //see if slug is unique
    Question
        .find({
            slug: slug
        })
        .then(response => {
            if(response.length === 0) {
                this.slug = slug
                next()
            } else {
                slug = slug + '-' + (response.length+1)
                this.slug = slug
                next()
            }
        })
})


const Question = mongoose.model('Question', questionSchema, 'Questions')

module.exports = Question