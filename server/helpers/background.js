const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS
  }
})

module.exports = {
  createEmailQueue({ name, email }) {
    return queue.create('email', {
      title: `Welcome email for ${email}`,
      subject: `Welcome to Hacktiv Overflow, ${name}`,
      email,
      text: `Hi ${name},
Welcome to Hacktiv Overflow. Now you are becoming part of a big revolution in knowledge sharing.
Enjoy...`
    })
      .save(err => {
        if (err) console.error(err.message)
      })
  },

  processEmailQueue() {
    queue.process('email', function ({ data }, done) {
      const mailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: data.email,
        subject: data.subject,
        text: data.text
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
        }
        else {
          done()
        };
      });
    })
  }
}