var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
  title: { 
    type : String,
    required : [true, 'Title cannot be empty'],
  },
  content: { 
    type : String,
    required : [true, 'Content cannot be empty'] 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timeStamp: {
    type: Date,
    default: new Date()
  },
  upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  tags: [String],
  slug: {
    type: String,
    unique: true
  }
});

questionSchema.pre('save', function(next) {
  let slug = this.title.replace(/[^a-zA-Z0-9 ]/g, '')
  slug = slug.replace(/ /g, '-')
  slug = slug.toLowerCase()
  Question
    .find({
      slug: slug
    })
    .then(result => {
      if(result.length > 0) {
        slug = `${slug}-${result.length}`
        this.slug = slug
        next()
      } else {
        this.slug = slug
        next()
      }
    })
    .catch(err => {
      if(err) {
        throw (err)
      }
    })
})

const Question = mongoose.model("Question", questionSchema);

module.exports = Question