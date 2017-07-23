'use strict'

const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
module.exports = function (app) {
  const utility = app.getValue('utility')

  console.log('inside facebook auth')
  const environment = app.getValue('environment')
  const facebookConfig = environment.FACEBOOK
  // console.log('what is facebookConfig', facebookConfig);
  // console.log('what is callbackURL GOOGLE', facebookConfig.callbackURL.call(environment))
  // console.log('what is callbackurl', `${environment.getDomainUri.call(environment.web)}${facebookConfig.callbackUrl}`)
  const facebookCredentials = {
    clientID: facebookConfig.clientID,
    clientSecret: facebookConfig.clientSecret,
    callbackURL: `${environment.getDomainUri.call(environment.web)}${facebookConfig.callbackUrl}`,
    // enableProof: true,
    profileFields: ['id', 'displayName', 'emails', 'first_name', 'last_name']
  }

  const verifyCallback = function (accessToken, refreshToken, profile, done) {
    // console.log('inside google oauth verifycallback')
    console.log('what is profile', profile)
    console.log('what is accessToken', accessToken)
    console.log('what is refreshToken', refreshToken)
    UserModel.findOne({'facebook.id': profile.id}).exec()
    .then(function (user) {
      if (user) {
        return user
      } else {
        const profileJSON = profile._json
        console.log('what is profileJSON', profileJSON)
        // const testObj = {
        //   id: profile.id,
        //   displayName: profile.displayName,
        //   accessToken: accessToken,
        //   first_name:profile.first_name,
        //   last_name: profile.last_name,
        //   // picture: profile.picture.data,
        //   age_range:profile.age_range
        // }
        // console.log('what is testObj', testObj)
        const data = {
          firstName: profileJSON.first_name,
          lastName: profileJSON.last_name,
          email: profileJSON.email,
          photo: `https://graph.facebook.com/${profileJSON.id}/picture?type=large`,
        }
        return UserModel.create(Object.assign({}, ...data, {
          facebook: {
            id: profileJSON.id,
            displayName: profileJSON.name,
            accessToken: accessToken,
            ...data
          }
        }))
      }
    })
    .then(newOrExistingUser => {
      console.log('inside success promise of newOrExistingUser: what is newOrExistingUser._id', newOrExistingUser._id)
      // req.user will now have .token
      // this is part of passport strategy
      // newOrExistingUser.token = utility.security.signToken(newOrExistingUser._id)
      done(null, newOrExistingUser)
    })
    .catch(err => {
      console.error('Error creating user from Facebook authentication', err)
      done(err)
    })
  }

  passport.use(new FacebookStrategy(facebookCredentials, verifyCallback))
}
