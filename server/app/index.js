'use strict'
const express = require('express')
const path = require('path')
const parsing = require('./parsing')
const controller = require('./controller')
const authenticate = require('./authenticate')
const utility = require('./utility')
const webpack_middleware = require('./webpack')
// const helmet = require('./helmet')
const routes = require('./routes')
module.exports = function (config) {
  const app = express()
  // setValue and getValue are merely alias
  // for app.set and app.get used in the less
  // common way of setting application variables.
  app.setValue = app.set.bind(app)

  app.getValue = function (path) {
    return app.get(path)
  }

  const environment = config.environment
  app.setValue('environment', environment)
  parsing(app)
  utility(app)
  // helmet(app)
  authenticate(app)
  controller(app)
  routes(app)
  webpack_middleware(app)

  return app
}
