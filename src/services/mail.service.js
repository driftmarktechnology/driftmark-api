const transporter = require('../config/mail');

function sendMail(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailOptions);
}

module.exports = sendMail;
