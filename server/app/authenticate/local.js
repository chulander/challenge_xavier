'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
module.exports = function (app) {
  const utility = app.getValue('utility')

  const environment = app.getValue('environment')
  const localConfig = environment.LOCAL

  const verifyCallback = function (req, username, password, done) {
    // console.log('inside google oauth verifycallback')
    console.log('what is username', username)
    console.log('what is password', password)
    UserModel.findOne({'email': username}).exec()
    .then(function (user) {
      if (user) {
        return user
      } else {
        return UserModel.create({
          email: username,
          password: password
        })
      }
    })
    .then(newOrExistingUser => {
      console.log('inside success promise of newOrExistingUser: what is newOrExistingUser._id', newOrExistingUser._id)
      // req.user will now have .token
      // this is part of passport strategy
      newOrExistingUser.token = utility.security.signToken(newOrExistingUser._id)
      done(null, newOrExistingUser)
    })
    .catch(err => {
      console.error('Error creating user from Facebook authentication', err)
      done(err)
    })
  }

  passport.use(new LocalStrategy(localConfig, verifyCallback))
}
