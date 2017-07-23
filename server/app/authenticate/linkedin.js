'use strict'

const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
module.exports = function (app) {
  const utility = app.getValue('utility')

  // console.log('inside facebook auth')
  const environment = app.getValue('environment')
  const linkedInConfig = environment.LINKEDIN
  // console.log('what is linkedInConfig', linkedInConfig);
  // console.log('what is callbackURL GOOGLE', linkedInConfig.callbackURL.call(environment))
  // console.log('what is callbackurl', `${environment.getDomainUri.call(environment.web)}${linkedInConfig.callbackUrl}`)
  const linkedInCredentials = {
    clientID: linkedInConfig.clientID,
    clientSecret: linkedInConfig.clientSecret,
    callbackURL: `${environment.getDomainUri.call(environment.web)}${linkedInConfig.callbackUrl}`,
    enableProof: true
    // profileFields: ['r_emailaddress', 'r_basicprofile']
  }

  const verifyCallback = function (accessToken, refreshToken, profile, done) {
    // console.log('inside google oauth verifycallback')
    console.log('what is profile', profile)
    console.log('what is accessToken', accessToken)
    console.log('what is refreshToken', refreshToken)
    UserModel.findOne({'linkedin.id': profile.id}).exec()
    .then(function (user) {
      if (user) {
        return user
      } else {
        const profileJSON = profile._json
        console.log('what is linkedin profileJSON', profileJSON)
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
        return UserModel.create({
          linkedin: {
            id: profile.id
            // displayName: profile.displayName,
            // accessToken: accessToken,
            // first_name: profile.first_name,
            // last_name: profile.last_name,
            // // picture: profile.picture.data,
            // age_range: profile.age_range
          }
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

  passport.use(new LinkedInStrategy(linkedInCredentials, verifyCallback))
}
