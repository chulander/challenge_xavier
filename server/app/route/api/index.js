const apiRouter = require('express').Router()
// const playerRouter = require('./player')
// const groupRouter = require('./group')
const authRouter = require('./auth')
module.exports = function (app) {

  // apiRouter.use(
  //   passport.authenticate('jwt', {session: false}), function (req, res) {
  //     console.log('oh yea')
  //     res.json({data: 'bryan'})
  //   })

  // apiRouter.use('/player', playerRouter(app))
  // apiRouter.use('/group', groupRouter(app))
  apiRouter.use('/auth', authRouter(app))

  return apiRouter
}