const User = require('../models/user')
const moment = require('moment')
const mail = require('./mail')

module.exports = () => {
    User.find({
        birthday: moment().format('DD-MM')
    }) 
    .then( users => {
        users.forEach( user => {
            let job = queue.create('email', {
                email: user.email,
                subject: `Happy Birthday to you, ${user.name}`,
                content: `Thank you for still using our service.
                We wish you all the best for this year!`
                })
                .save( function(err){
                  if( !err ) console.log(`queueing sending email to: ${job.data.email}`);
            });
        })
    })
    .catch( err => {
        console.log(err.message);
    })
}