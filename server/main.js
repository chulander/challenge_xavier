/* eslint-disable global-require, import/no-dynamic-require, import/newline-after-import  */

const express = require('express')
module.exports = function(config) {
  const db = require('./db')(config)
  const app = express()

  const configuredApp = require('./app')(config)

  const server = require(configuredApp.getValue('environment').web.PROTOCOL).createServer(app)
  const io = require('./io')(server)
  app.use((req, res, next)=> {
    res.io = io
    next()
  })
  app.use(configuredApp)

  const startServer = function() {
    // const PORT = process.env.PORT || env ==='production' ? 5000 : 3000;

    server.listen(configuredApp.getValue('environment').web.PORT, ()=> {
      console.info('Server started on port', configuredApp.getValue('environment').web.PORT)
    })
  }
  db.then(startServer).catch(err => {
    console.error('what is start err', err)
    process.kill(1)
  })
}
