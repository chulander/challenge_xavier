const quoteRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Quote = mongoose.model('Quote')
module.exports = function (app) {

  const utility = app.getValue('utility')

  quoteRouter.post('/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      const quote = new Quote(Object.assign({},
        req.body, {
          createdBy: req.user.id
        }))
      quote.save().then(newQuote => {
        // res.io.sockets.in('news').emit('new quote', newQuote)
        res.status(200)
        res.json({
          quote: {
            title: newQuote.title,
            message: newQuote.message,
            // id: utility.security.encodeBase64(newQuote.id)
            id: newQuote.id
          },
          success: true,
          message: `Created quote "${newQuote.name}"`
        })
      }).catch(err => {
        res.json({
          success: false,
          message: /duplicate/.test(err.message)
            ? `${req.body.title} already exists`
            : err.message
        })
      })
    })
  quoteRouter.delete('/:quoteId', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // const mongoId = utility.security.decodeBase64(req.params.quoteId)
      const quoteId = req.params.quoteId
      console.log('what is req.params.quoteId', req.params.quoteId)
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      // Quote.findById(req.params.quoteId).exec()
      Quote.remove({_id: quoteId}).exec().then(() => {
        res.io.sockets.in('news').emit('delete quote', quoteId)
        res.json({
          success: true,
          message: `Deleted quote`
        })
      }).catch(err => {
        res.json({
          success: false,
          message: err.message
        })
      })
    })

  quoteRouter.put('/:quoteId', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // const mongoId = utility.security.decodeBase64(req.params.quoteId)
      const quoteId = req.params.quoteId
      console.log('what is req.params.quoteId', req.params.quoteId)
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      // Quote.findById(req.params.quoteId).exec()
      Quote.findByIdAndUpdate(quoteId, req.body, {new: true}
      ).exec().then(updatedQuote => {
        res.io.sockets.in('news').emit('update quote', updatedQuote)
        res.json({
          success: true,
          message: `Updated a quote`
        })
      }).
      catch(err => {
        res.json({
          success: false,
          message: err.message
        })
      })
    })

  return quoteRouter
}