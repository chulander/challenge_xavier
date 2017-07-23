'use strict'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip')
module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(requestIp.mw())
}
