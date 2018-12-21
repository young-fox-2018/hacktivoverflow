const mongoose = require('mongoose'),
        slug = require('mongoose-slug-generator')
        mongoose.plugin(slug)
        
const User = require('../models/User')

const questionSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    upVoters : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    downVoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    status: {
        type: String,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    tags: [String],
    body: {
        type: String,
        minlength: 10,
        required: [true, 'question body is required']
    }, 
    title: {
        type: String,
        required: [true, 'title is required'],
        unique: [true, 'title must be unique']
    }, 
    slug: {
        type: String,
        unique: true,
        slug: "title"
    }
})

const Question = mongoose.model('Question', questionSchema)

questionSchema.pre('update', function(next){
    this.updatedAt = new Date()
    next()
})


questionSchema.pre('save', function(next){
    User.findOneAndUpdate({
        _id: this.author
    }, {
        $inc: { reputation: 1}
    }, function(err, user){
        if(err) {
            console.log(err)
            return next(err)
        } else {
            console.log(user)
            next()
        }
    })
})

questionSchema.post('remove', function(doc, next){
    mongoose.model('Answer').deleteMany({ _id: {$in : doc.answers}})
        .then(deleted=> {
            next()
        })
        .catch(err=> {
            next(err)
        })
})



module.exports = Question