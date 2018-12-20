var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Slug = require('mongoose-slug-generator')
const option = {
  separator : "-",
  lang : "en",
  truncate : 120
}
mongoose.plugin(Slug, option)
var pertanyaanSchema = new Schema({
  title: {
    type : String,
    required : [true, 'Sorry!, title must be filled']
  } ,
  slug : {
    type : String, slug : "title", unique : true
  },
  description : {
    type : String,
    required : [true, 'Sorry!, description must be filled']
  },
  tags : {
    type : []
  },
  user : {type: Schema.Types.ObjectId, ref: 'User'},
  upvote : [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote : [{type: Schema.Types.ObjectId, ref: 'User'}],
  jawaban : [{type: Schema.Types.ObjectId, ref: 'Jawaban'}]

}, { timestamps : true });
pertanyaanSchema.post('remove', function(doc, next){
  let jawaban = doc.jawaban
  mongoose.model('Jawaban').deleteMany({
    _id : {$in : jawaban }
  })
  .then( response => {
    next()
  })
})

const  Pertanyaan = mongoose.model('Pertanyaan', pertanyaanSchema)
module.exports =  Pertanyaan

