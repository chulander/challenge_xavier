const authRouter = require('express').Router()
const passport = require('passport')
const csrf = require('csurf')
module.exports = function (app) {

  const utility = app.getValue('utility')
  const controller = app.getValue('controller')
  // authRouter.use(csrf({cookie: true}))
  authRouter.post('/login', controller.auth.loginUser)
  // authRouter.get('/signup', controller.auth.getCsrfToken)
  authRouter.post('/signup', controller.auth.createUser)

  authRouter.get('/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // console.log('inside api/auth')
      console.log('what is req.user here', req.user)
      res.json(req.user)
    })

  // const getCsrfToken = function (req, res) {
  //   res.json({
  //     csrfToken: req.csrfToken()
  //   })
  // }

  // authRouter.post('/login', function (req, res) {
  //   console.log('inside login post')
  //   User.findOne({
  //     email: req.body.email
  //   }).exec().then(user => {
  //     return user && user.correctPassword(req.body.password)
  //       ? user
  //       : Promise.reject(new Error('Credentials are invalid'))
  //   }).then(validUser => {
  //     res.status(200)
  //     res.json({
  //       token: utility.security.signToken(validUser.id)
  //     })
  //   }).catch(err => {
  //     console.log('login error', err)
  //     console.log('login error:message', err.message)
  //
  //     res.status(401)
  //     res.json({
  //       message: err.message
  //     })
  //   })
  // })

  // authRouter.get('/signup', function (req, res) {
  //   res.json({
  //     // csrfToken: req.csrfToken()
  //   })
  // })
  // authRouter.post('/signup', function (req, res) {
  //   // console.log('what is req.body', req.body)
  //   const user = new User(Object.assign({},
  //     req.body, {
  //       createdByIp: req.clientIp,
  //       createdByUserAgent: useragent.parse(req.headers['user-agent']).source
  //     }
  //   ))
  //   user.save().then(userData => {
  //     res.status(201)
  //     res.json({
  //       token: utility.security.signToken(userData.id)
  //     })
  //   }).catch(err => {
  //     console.log('signup error', err)
  //     res.status(401)
  //     res.json({
  //       error: err.message
  //     })
  //   })
  // })


  return authRouter
}
