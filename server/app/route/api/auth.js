const authRouter = require('express').Router()
const useragent = require('express-useragent')
const mongoose = require('mongoose')
const passport = require('passport')
const User = mongoose.model('User')
const csrf = require('csurf')
module.exports = function (app) {

  const utility = app.getValue('utility')
  // authRouter.use(csrf({cookie: true}))
  authRouter.post('/login', function (req, res) {
    console.log('what is req.body', req.body)
    User.findOne({
      email: req.body.email
    }).exec().then(user => {
      return user.correctPassword(req.body.password)
        ? user
        : Promise.reject(new Error({
          message: 'Credentials are invalid'
        }))
    }).then(validUser => {
      res.status(200)
      res.json({
        token: utility.security.signToken(validUser.id)
      })
    }).catch(err => {
      res.status(401)
      res.json({
        message: err.message
      })
    })
  })

  authRouter.get('/signup', function (req, res) {
    res.json({
      // csrfToken: req.csrfToken()
    })
  })
  authRouter.post('/signup', function (req, res) {
    console.log('what is req.body', req.body)
    const user = new User(Object.assign({},
      req.body, {
        createdByIp: req.clientIp,
        createdByUserAgent: useragent.parse(req.headers['user-agent']).source
      }
    ))
    user.save().then(userData => {
      res.status(201)
      res.json({
        token: utility.security.signToken(userData.id)
      })
    }).catch(err => {
      console.log('signup error', err)
      res.status(202)
      res.json({
        error: err.message
      })
    })
  })

  authRouter.get('/', function(req, res){
    console.log('what is req.headers', req.headers)
    const validToken = utility.security.verifyToken(req.headers.authorization)
    if(validToken){
      res.status(200)
      res.end()
    } else {
      res.status(401)
      res.end()
    }
  })

    return authRouter
}
