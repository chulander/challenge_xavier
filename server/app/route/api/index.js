const apiRouter = require('express').Router()
const authRouter = require('./auth')
const blogRouter = require('./blog')
module.exports = function (app) {

  // apiRouter.use(
  //   passport.authenticate('jwt', {session: false}), function (req, res) {
  //     console.log('oh yea')
  //     res.json({data: 'bryan'})
  //   })

  // apiRouter.use('/player', playerRouter(app))
  // apiRouter.use('/group', groupRouter(app))
  apiRouter.use('/auth', authRouter(app))
  apiRouter.use('/blog', blogRouter(app))

  return apiRouter
}