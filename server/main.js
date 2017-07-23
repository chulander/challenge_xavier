'use strict'
const express = require('express')
const path = require('path')
const fs = require('fs')
module.exports = function (config) {
  const db = require('./db')(config)
  const app = express()

  const configuredApp = require('./app')(config)

  const server = require(configuredApp.getValue('environment').web.PROTOCOL).
  createServer(app)
  const io = require('./io')(server)
  app.use(function(req,res,next){
    res.io=io
    next()
  })
  app.use(configuredApp)
  // const createApplication = function () {
  //   server.on('request', app) // Attach the Express application.
  //   require('./io')(server)   // Attach socket.io.
  // }

  const startServer = function () {
    // const PORT = process.env.PORT || env ==='production' ? 5000 : 3000;

    server.listen(configuredApp.getValue('environment').web.PORT, function () {
      console.log('Server started on port',
        configuredApp.getValue('environment').web.PORT)
    })

  }
  db.then(startServer).catch(err => {
    console.log('what is start err', err)
    process.kill(1)
  })


}
