const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag