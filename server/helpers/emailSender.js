const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports = function (receiver, content, done) {
    const mailOptions = {
        from: 'mesendyakbars@gmail.com',
        to: receiver,
        subject: content.header,
        html: content.main
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err)
        else {
            console.log(info)
            done()
        };
    });
}