// 'use strict'
//
// module.exports = function (app){
//
//   const environment = app.getValue('environment')
//
//   const contact = function (req, res, next) {
//
//     const regex = /(<([^>]+)>)/ig
//     req.body = JSON.parse(JSON.stringify(req.body).replace(regex, ''))
//     const emailOptions = {  // email options
//       from: environment.EMAIL.user,
//       to: req.body.email, // receiver
//       subject: 'Meeting with Bryan Chu received', // subject
//       text: `Hi ${req.body.firstName} ${req.body.lastName}. This is a confirmation that your request has been received.` // body
//     }
//     smtpTransport.sendMail(emailOptions, function (error, response) {  // callback
//       if (error) {
//         // console.log(error);
//       } else {
//         // console.log('Message sent: ' + response);
//         res.send({response})
//       }
//
//       smtpTransport.close()
//     })
//
//     return {
//
//   }
// }
//
//
//   // smtpTransport.sendMailAsync(emailOptions)
//   // .then(response => {
//   //   console.log('Message sent: ' + response.message);
//   //   // shut down the connection pool, no more messages.
//   //   // Comment this line out to continue sending emails.
//   //   smtpTransport.close();
//   //   res.send({ response })
//   // })
//   // .catch(error => {
//   //   console.log('request_contact: error', error);
//   //   // shut down the connection pool, no more messages.
//   //   // Comment this line out to continue sending emails.
//   //   smtpTransport.close();
//   // })
//
