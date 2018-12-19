const date = require('./newDate')
const dateClose = require('./closedDate')
const question = require('../models/question')
const kue = require('kue')
const que = kue.createQueue()

module.exports = function () {
    let datenow = date()
    question.find({
       closed: datenow
    })
        .populate('userId')
        .then(data => {
            if (data.length != 0) {
                data.forEach(val => {
                    que.create('email', {
                        title: 'Closed question notification',
                        email: val.userId.email,
                        template: `<p>Hi, your question about<strong> ${val.title}</strong> has been deleted.</p>`
                    }).save(function (err) {
                        if (err) {
                            Console.log(err)
                        }
                    })
                })
                return question.deleteMany({
                    closed: datenow
                })
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}