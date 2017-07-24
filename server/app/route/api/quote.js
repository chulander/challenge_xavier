const quoteRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Quote = mongoose.model('Quote')
const fetch = require('node-fetch')
const cors = require('cors')
module.exports = function (app) {

  const utility = app.getValue('utility')
  const apiHeaders = utility.security.getApiHeaders()
  console.log('what is apiHeaders', apiHeaders)
  const config = {
    method: 'POST',
    headers: utility.security.getApiHeaders()
  }

  quoteRouter.post('/', passport.authenticate('jwt', {session: false}),cors(),
    function (req, res) {
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      config.body = JSON.stringify(req.body)
      console.log('what is config', config)
      fetch(
        'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge',
        config).then(res => {
        console.log('node-fetch: what is res', res)
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(new Error(res.errors))
        }
      }).then(data => {
        console.log('what is data', data)
        res.status(200)
        res.json({
          quote: {
            premium: data.annual_premium,
          },
          success: true,
          message: `Created quote`
        })
        console.log('still running here?')
        new Quote(Object.assign({},
          req.body, {
            createdBy: req.user.id,
            annual_premium: data.annual_premium
          })).save().then(newQuote => {
          console.log('successfully created newQuote', newQuote)

        }).catch(err => {
         console.log('what is saving error', err)
        })
      }).catch(err => {
        new Quote(Object.assign({},
          req.body, {
            createdBy: req.user.id,
          })).save().then(newQuote => {
          console.log('successfully created newQuote', newQuote)
          res.json({
            quote: {

            },
            success: false,
            message: `error getting quote`
          })
        }).catch(err => {
          console.log('what is promise catch error', err)
        })
      })

    })

  return quoteRouter
}