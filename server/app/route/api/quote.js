const quoteRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Quote = mongoose.model('Quote')
const fetch = require('node-fetch')
const {Headers} = require('node-fetch')
const http = require('http')
const cors = require('cors')
const request = require('request-promise-native')
module.exports = function (app) {

  const utility = app.getValue('utility')
  const apiHeaders = utility.security.getApiHeaders()
  // const apiHeaders = new Headers({
  //
  //   'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
  //   'Content-Type':'application/json'
  // })
  console.log('what is apiHeaders', apiHeaders)
  const config = {
    method: 'POST',
    headers: apiHeaders,
    url:  'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge',
  }

  quoteRouter.post('/', passport.authenticate('jwt', {session: false}), cors(),
    function (req, res) {
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      config.body = JSON.stringify(req.body)
      console.log('what is config', config)
      config.body = JSON.stringify(req.body)
      // const postOptions = {
      //   hostname: 'j950rrlta9.execute-api.us-east-2.amazonaws.com',
      //   port: 80,
      //   path: '/v1/ArgoChallenge',
      //   method:'POST',
      //   headers: {
      //     'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
      //     'Content-Type': 'application/json'
      //   }
      // }
      // const test = http.request(postOptions, (res) => {
      //   console.log('STATUS: ' + res.statusCode)
      //   console.log('HEADERS: ' + JSON.stringify(res.headers))
      //   res.setEncoding('utf8')
      //   res.on('data', function (chunk) {
      //     console.log('BODY: ' + chunk)
      //   })
      // })
      // test.on('error', (e)=>{
      //   console.log('issue!', e.message)
      // })
      // test.end()

      request(config)
      .then(res => {
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
            premium: data.annual_premium
          },
          success: true,
          message: `Created quote`
        })
        console.log('still running here?')
        // new Quote(Object.assign({},
        //   req.body, {
        //     createdBy: req.user.id,
        //     annual_premium: data.annual_premium
        //   })).save().then(newQuote => {
        //   console.log('successfully created 1 newQuote', newQuote)
        //
        // }).catch(err => {
        //   console.log('what is saving error', err)
        // })
      }).catch(err => {
        console.log('quote error', err)
        // new Quote(Object.assign({},
        //   req.body, {
        //     createdBy: req.user.id
        //   })).save().then(newQuote => {
        //   console.log('successfully created 2 error newQuote', newQuote)
        //   res.json({
        //     quote: {},
        //     success: false,
        //     message: `error getting quote`
        //   })
        // }).catch(err => {
        //   console.log('what is promise catch error', err)
        // })
      })

    })

  return quoteRouter
}