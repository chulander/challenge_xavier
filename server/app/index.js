'use strict'
const express = require('express')
const path = require('path')
const parsing = require('./parsing')
const controller = require('./controller')
const authenticate = require('./authenticate')
const utility = require('./utility')
const webpackMiddleware = require('./webpack')
const batch = require('./batch')
const routes = require('./routes')
module.exports = function (config) {
  const app = express()

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
  webpackMiddleware(app)
  batch(app)

  return app
}
