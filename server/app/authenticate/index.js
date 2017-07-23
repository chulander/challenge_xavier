'use strict'
const passport = require('passport')
const {ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt')
const path = require('path')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

var ENABLED_AUTH_STRATEGIES = [
  // 'local',
  // 'twitterssssssss',
  // 'facebook',
  // 'google',
  // 'linkedin'
]

module.exports = function (app) {
  //
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

    // console.log('JwtStrategy: what is user', user)

  })
  passport.use(strategy)
  // app.use(session({
  //   secret: app.get('environment').SESSION.secret,
  //   store: new MongoStore({
  //     mongooseConnection: mongoose.connection
  //   })
  //
  // }))

  // Initialize passport and also allow it to read
  app.use(passport.initialize())
  // app.use(passport.session())

  // passport.serializeUser(function (user, done) {
  //   done(null, user.id)
  // })

  // When we receive a cookie from the browser, we use that id to set our req.user
  // to a user found in the database.
  // passport.deserializeUser(function (id, done) {
  //   UserModel.findById(id).then(function (user) {
  //     done(null, user)
  //   }).catch(done)
  // })

  // Each strategy enabled gets registered.
  // ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
  //   require(path.join(__dirname, strategyName))(app)
  // })
}
