'use strict'

module.exports = function(app) {
  const controller = {
    error: require('./error')(app),
    blog: require('./blog')(app),
    auth: require('./auth')(app),
    quote: require('./quote')(app)
  }

  app.setValue('controller', controller)
  return app
}
