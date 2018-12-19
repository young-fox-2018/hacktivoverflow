var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jawabanSchema = new Schema({
  isi: {
    type : String,
    required : [true, 'Sorry, jawabn must be filled!']
  } ,
  user:{ 
    type : Schema.Types.ObjectId, ref: 'User'
  },
  pertanyaan : {
    type : Schema.Types.ObjectId, ref : 'Pertanyaan'
  },
  upvote : [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  downvote : [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
},{ timestamps:true });

jawabanSchema.post('save', function(doc, next){
    mongoose.model('Pertanyaan').findByIdAndUpdate(doc.pertanyaan,{
      $push : {
        jawaban : doc._id
      }
    })
    .then( response => {
      next()
    })
})
jawabanSchema.post('remove', function(doc, next){
  mongoose.model('Pertanyaan').findByIdAndUpdate(doc.pertanyaan,{
    $pull : {
      jawaban : doc._id
    }
  })
  .then( response => {
    next()
  })
  next()
})

const Jawaban = mongoose.model('Jawaban', jawabanSchema)

module.exports =  Jawaban

