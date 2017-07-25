'use strict'

// const email = require('./email')
// const authenticate = require('./authenticate')

module.exports = function (app) {
  const controller = {
    // email: email(app),
    error: require('./error')(app),
    blog: require('./blog')(app),
    auth: require('./auth')(app),
    quote:require('./quote')(app)
    // authenticate: authenticate(app)
  }

  app.setValue('controller', controller)
  return app
}
