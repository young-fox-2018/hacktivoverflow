const nodemailer = require('nodemailer');

function mail(receiver, subject, content, done)  {
    let sender = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'HacktivOverflow',
        to: receiver,
        subject: subject,
        html: content
    };

    sender.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error: ', error);
        }
        console.log('info', info, nodemailer.getTestMessageUrl(info));
    });
    
    done()
}

module.exports = mail