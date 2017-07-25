const quoteRouter = require('express').Router()
const passport = require('passport')

module.exports = function (app) {
  const controller = app.getValue('controller')
  quoteRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    controller.quote.createQuote
  )

  return quoteRouter
}