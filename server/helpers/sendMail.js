
const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.pass
    }
});


module.exports = function (receiver, content, done) {
    const mailOptions = {
        from: 'hafrizresa@gmail.com',
        to: receiver,
        subject: content.header,
        html: content.main
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
            done()
        }
        else {
            console.log(info)
            done()
        };
    });
}