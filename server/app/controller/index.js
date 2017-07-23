'use strict'

// const email = require('./email')
const error = require('./error')
// const authenticate = require('./authenticate')

module.exports = function (app) {
  const controller = {
    // email: email(app),
    error: error(app),
    // authenticate: authenticate(app)
  }

  app.setValue('controller', controller)
  return app
}
