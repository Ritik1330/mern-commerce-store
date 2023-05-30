const nodeMailer = require("nodemailer");


const sendEmail = async (options) => {
    const trasporter = nodeMailer.createTransport({
        // host:"smtp.yahoo.com",
        // port:465,
        // service: process.env.SMPT_SEVARCE,
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
        debug: false,
        logger: true ,
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await trasporter.sendMail(mailOptions)

}




module.exports = sendEmail