const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const mongodbUri = 'mongodb://@ds155653.mlab.com:55653/hacktivoverflow'
require('dotenv').config()
const kue = require('kue')
const queue = kue.createQueue()

//chron - To check popularity and send email based on it
const cron = require('node-cron')
const sendEmail =  require('./helpers/nodemailer')
const User =  require('./models/user')
cron.schedule('0 12 * * 7', () => {
  // use this to show popularity when it reaches a certain amount
  User
    .find({})
    .where('popularity').gt(9)
    .then((response) => {
      response.forEach(user => {
        if(user.popularity < 50 && user.popularity_mark === 0 ) { 
          var job = queue.create('email', {
            title: 'Email to notify popularity > 10',
            subject: 'HacktivOverflow Popularity Info',
            to: user.email,
            html: `
            <p style="font-size:16px"><b>Hi ${user.name}</b>,
            </p> <p>Good News! As of this moment, You have been upvoted 10 times . 
            <br> Keep it up and you might even reach 50 up votes!</p> 
            <p style="font-size:14px">Hacktiv Overflow Team</p>
            `
          }).save( function(err) {
            if(!err) {
              console.log(`Job saved with id ${job.id}`)
            }
          })

          //update popularity_mark
          user.popularity_mark = 10
          user.save()
        } else if (user.popularity > 49 && user.popularity < 100 && user.popularity_mark === 10) {
          
          var job = queue.create('email', {
            title: 'Email to notify popularity > 50',
            subject: 'HacktivOverflow Popularity Info',
            to: user.email,
            html: 
            `
            <p style="font-size:16px"><b>Hi ${user.name}</b>,
            </p> <p>Good News! As of this moment, You have been upvoted 50 times . 
            <br> That's some awesome stuff. Keep going and try to reach 100!</p> 
            <p style="font-size:14px">Hacktiv Overflow Team</p>
            `
          }).save( function(err) {
            if(!err) {
              console.log(`Job saved with id ${job.id}`)
            }
          })
          
          //update popularity_mark
          user.popularity_mark = 50
          user.save()
        } else if (user.popularity > 100 && user.popularity_mark === 50) {

          var job = queue.create('email', {
            title: 'Email to notify popularity > 100',
            subject: 'HacktivOverflow Popularity Info',
            to: user.email,
            html: 
            `
            <p style="font-size:16px"><b>Hi ${user.name}</b>,
            </p> <p>Good News! As of this moment, You have been upvoted 100 times . 
            <br> Congratulations! That is quite the achievement.</p> 
            <p style="font-size:14px">Hacktiv Overflow Team</p>
            `
          }).save( function(err) {
            if(!err) {
              console.log(`Job saved with id ${job.id}`)
            }
          })

          //update popularity_mark
          user.popularity_mark = 100
          user.save()
        } 
      })
    })
});

queue.process('email',function(job, done) {
  sendEmail(job.data.to, job.data.subject, job.data.html, done)
})

//routes
const registeration = require('./routes/registeration.js')
const question = require('./routes/question.js')
const answer = require('./routes/answer.js')
const decode = require('./routes/decode.js')

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//routes
app.use('/ho', registeration)
app.use('/ho/decode', decode)
app.use('/ho/questions', question)
app.use('/ho/answers', answer)

kue.app.listen(4000, function() {
  console.log('Redis running')
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})

module.exports = app