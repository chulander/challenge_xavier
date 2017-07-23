'use strict'

// const authRouter = require('./auth')
const apiRouter = require('./api')
// const routeRouter = require('express').Router()
const passport = require('passport')
module.exports = function (app) {
  // if(process.env.NODE_ENV==='production'){
  // console.log("app.get('projectRoot')", app.get('projectRoot'));
  //   const clientRouter = require(`${app.get('projectRoot')}/client/expressRouter`)
  //   console.log('inside user client router')
  // app.use(clientRouter)
  // }
  const controller = app.getValue('controller')
  // apiRouter.use('/auth', authRouter(app))

  // app.use('/api', controller.authenticate.decodeToken, apiRouter)
  app.use('/api', apiRouter(app))
  // app.use('/auth', authRouter(app))
  // app.use('/',routeRouter)
  app.use(controller.error.catchAllError)
}
