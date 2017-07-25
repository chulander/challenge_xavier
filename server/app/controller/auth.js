const useragent = require('express-useragent')
const mongoose = require('mongoose')
const passport = require('passport')
const User = mongoose.model('User')

module.exports = function (app) {

  const utility = app.getValue('utility')

  const loginUser = function (req, res) {
    // console.log('inside login post')
    User.findOne({
      email: req.body.email
    }).exec().then(user => {
      return user && user.correctPassword(req.body.password)
        ? user
        : Promise.reject(new Error('Credentials are invalid'))
    }).then(validUser => {
      res.status(200)
      res.json({
        token: utility.security.signToken(validUser.id)
      })
    }).catch(err => {
      // console.log('login error', err)
      // console.log('login error:message', err.message)

      res.status(401)
      res.json({
        message: err.message
      })
    })
  }

  const createUser = function (req, res) {
    const user = new User(Object.assign({},
      req.body, {
        createdByIp: req.clientIp,
        createdByUserAgent: useragent.parse(req.headers['user-agent']).source
      }
    ))
    user.save().then(userData => {
      res.status(201)
      res.json({
        success:true,
        token: utility.security.signToken(userData.id)
      })
    }).catch(err => {
      console.log('signup error', err)
      res.status(401)
      res.json({
        success: false,
        message: /duplicate/.test(err.message) ? `${req.body.email} already exists` : err.message
      })
    })
  }

  return {
    createUser,
    loginUser
  }
}
