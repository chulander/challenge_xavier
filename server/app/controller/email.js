'use strict'
const chutils = require('chutils')
const nodemailer = require('nodemailer')
const app_pw = 'ujun aexl uzbc uyzv'
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bryan.p.chu@gmail.com',
    pass: app_pw
  }
})
// smtpTransport.sendMailAsync = chutils.async.promisify(smtpTransport.sendMail, smtpTransport);
// smtpTransport.sendMail({  //email options
//   from: 'bryan.p.chu@gmail.com <bryan.p.chu@gmail.com>',
//   to: 'bryan chu <shino.sk@gmail.com>', // receiver
//   subject: 'Emailing with nodemailer', // subject
//   text: 'Email Example with nodemailer' // body
// }, function ( error, response ) {  //callback
//   if ( error ){
//     console.log(error);
//   }
//   else {
//     console.log('Message sent: ' + response.message);
//   }
//
//
// });

const contact = function (req, res, next) {
  // console.log('what is req.body', req.body);
  // remove script tags
  const regex = /(<([^>]+)>)/ig
  req.body = JSON.parse(JSON.stringify(req.body).replace(regex, ''))
  const emailOptions = {  // email options
    from: 'bryan.p.chu@gmail.com',
    to: req.body.email, // receiver
    subject: 'Meeting with Bryan Chu received', // subject
    text: `Hi ${req.body.firstName} ${req.body.lastName}. This is a confirmation that your request has been received.` // body
  }
  smtpTransport.sendMail(emailOptions, function (error, response) {  // callback
    if (error) {
      // console.log(error);
    } else {
      // console.log('Message sent: ' + response);
      res.send({response})
    }

    smtpTransport.close()
  })

  // smtpTransport.sendMailAsync(emailOptions)
  // .then(response => {
  //   console.log('Message sent: ' + response.message);
  //   // shut down the connection pool, no more messages.
  //   // Comment this line out to continue sending emails.
  //   smtpTransport.close();
  //   res.send({ response })
  // })
  // .catch(error => {
  //   console.log('request_contact: error', error);
  //   // shut down the connection pool, no more messages.
  //   // Comment this line out to continue sending emails.
  //   smtpTransport.close();
  // })
}

module.exports = function (app) {
  return {
    contact
  }
}
