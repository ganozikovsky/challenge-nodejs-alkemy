// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')

class MailService {
  constructor (to, subject, text = '', html = '') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    this.msg = {
      to, // change to your recipient
      from: process.env.SENDGRID_FROM, // change to your verified sender
      subject,
      text,
      html
    }
  }

  async sendMail () {
    sgMail
      .send(this.msg)
      .then(() => {
        return true
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

module.exports = MailService
