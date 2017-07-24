const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const util = require('util')

module.exports = function (app) {
  const environment = app.getValue('environment')

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: environment.EMAIL.user,
      pass: environment.EMAIL.secret
    }
  })
  const sendMailAsync = util.promisify(smtpTransport.sendMail)
  function signToken (id) {
    return jwt.sign(
      {_id: id},
      environment.JWT.secret,
      {expiresIn: environment.JWT.expiresIn}
    )
  }
  function getApiHeaders(){
    return {
      'x-api-key': environment.QUOTE.apiKey,
      'Content-Type': 'application/json'
    }
  }

  return {
    signToken,
    getApiHeaders,
    smtpTransport,
    sendMailAsync
  }
}
