const nodemailer = require('nodemailer');
// hidupkan dulu access for less secure apps
// https://myaccount.google.com/lesssecureapps?pli=1

const sendMail = (receiver, nameUser) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS_EMAIL
        }
    });

    let mailOptions = {
        from: 'Blog Zainal',
        to: receiver,
        subject: 'WelCome Hacktivoverflow Zainal',
        html: `<h1>Hai, ${nameUser} Selamat datang di zainal Hacktivoverflow</a></h1>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('err: ', error);
        }
        console.log('Sent Mail: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendMail;