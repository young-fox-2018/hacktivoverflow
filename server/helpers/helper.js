const User = require('../models/user')
var nodemailer = require('nodemailer');
var kue = require('kue')
var queue = kue.createQueue();

class Helper {
  static getCurrentUser(id) {
    return new Promise ((resolve, reject) => {
      User
        .findOne({
          _id : id
        })
        .then((result) => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static changeUserPopularity(user, newPopularity) {
    return new Promise ((resolve, reject) => {
      user
        .update({
          $set: {
            popularity: newPopularity
          }
        })
        .then((data) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static sendTopUserNotif() {
     User.find({}, { password: 0, __v: 0 })
      .then((users) => {
          users = users.sort(function(a, b) {
              return b.popularity - a.popularity
          }).slice(0, 5)
          
          users.forEach(user => {
            var job = queue.create('email', {
                title: `Congratulation your account ${user.name} reach top 5 place at our website hacktivoverflow.com`
              , to: user.email
              , template: `Thanks for your contribution at our website, keep up the good work at helping each other ! your account name will be embeded on our site for a month`
            }).save( function(err){
              if( !err ) console.log( job.id );
            })
          })
      })
      .catch(err => {
          console.log(err)
      })
  }

  static sendEmail(data, done) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: process.env.GMAIL_ACC,
             pass: process.env.GMAIL_PASS
         }
     })

    const mailOptions = {
      from: process.env.GMAIL_ACC, // sender address
      to: data.to, // list of receivers
      subject: data.title, // Subject line
      html: data.template // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        console.log(err)
        done()
      }
      else {
        console.log(info)
        done()
      }
   })
  }

  
}

module.exports = Helper