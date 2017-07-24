'use strict'

module.exports = function (app) {
  // mounting dev middleware
  if (app.getValue('env').ENVIRONMENT === 'production') {
    // not ready
  } else {

    require('./dev-middleware')(app)
  }
}
