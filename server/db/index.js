'use strict'
const mongoose = require('mongoose')
module.exports = function (config) {
  const environment = config.environment
  const db = mongoose.connect(`${environment.database.URI}/${environment.appName}`).connection

  mongoose.Promise = Promise

  require('./model')

  const startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve)
    db.on('error', reject)
  })

  startDbPromise.then(function () {
    console.info('MongoDB connection opened!')
  })

  return startDbPromise
}
