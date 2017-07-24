const apiRouter = require('express').Router()
const authRouter = require('./auth')
const blogRouter = require('./blog')
const quoteRouter = require('./quote')
module.exports = function (app) {

  apiRouter.use('/auth', authRouter(app))
  apiRouter.use('/blog', blogRouter(app))
  apiRouter.use('/quote', quoteRouter(app))

  return apiRouter
}