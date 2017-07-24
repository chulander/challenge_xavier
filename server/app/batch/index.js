'use strict'
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

module.exports = function (app) {
  const environment = app.getValue('environment')

  setInterval(function(){

  },environment.BATCH.interval)
}
