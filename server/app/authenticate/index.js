'use strict'
const passport = require('passport')
const {ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

module.exports = function (app) {

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: app.getValue('environment').JWT.secret
  }

  const strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
    console.log('payload received', jwtPayload)
    UserModel.findById(jwtPayload._id).exec().then(user => user
      ? next(null, user)
      : Promise.reject()
    ).catch(err => {
      next(null, false)
    })

  })
  passport.use(strategy)

  // Initialize passport and also allow it to read
  app.use(passport.initialize())
}
