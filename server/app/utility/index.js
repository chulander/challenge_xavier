'use strict'
const security = require('./security')
module.exports = function (app) {
  const utility = {
    security: security(app)
  }
  app.setValue('utility', utility)
  return app
}
