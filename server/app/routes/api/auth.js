const authRouter = require('express').Router()
const passport = require('passport')
// const csrf = require('csurf')
module.exports = function (app) {

  // const csrfProtection = csrf({
  //   cookie:true
  // })
  const utility = app.getValue('utility')
  const controller = app.getValue('controller')
  // authRouter.use(csrf({cookie: true}))
  authRouter.post('/login', controller.auth.loginUser)
  // authRouter.get('/signup', controller.auth.getCsrfToken)
  authRouter.post('/signup',  controller.auth.createUser)

  authRouter.get('/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // console.log('inside api/auth')
      console.log('what is req.user here', req.user)
      res.json(req.user)
    })
  // authRouter.get('/getCsrfToken',  function(req,res){
  //   res.json({
  //     csrfToken: req.csrfToken()
  //   })
  // })
  // const getCsrfToken = function (req, res) {

  // }


  return authRouter
}
