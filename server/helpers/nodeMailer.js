const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});


module.exports = function (receiver, content, done) {
    const mailOptions = {
        from: 'hacktivoverflow8@gmail.com',
        to: receiver,
        subject: content.header,
        html:content.main
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err)
        }
        else{
            console.log(info)
            done()
        };
    });
}