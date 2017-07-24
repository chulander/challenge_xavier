const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = function (app) {
  const environment = app.getValue('environment')

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
    getApiHeaders
  }
}
