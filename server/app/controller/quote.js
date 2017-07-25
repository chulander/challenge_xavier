const mongoose = require('mongoose')
const Quote = mongoose.model('Quote')
const request = require('request-promise-native')
module.exports = function (app) {
  const environment = app.getValue('environment')
  const utility = app.getValue('utility')
  const apiHeaders = utility.security.getApiHeaders()
  const createQuote = function (req, res) {
    const config = {
      method: 'POST',
      headers: apiHeaders,
      url: environment.QUOTE.url,
    }

    console.log('what is req.body', req.body)
    console.log('what is req.user', req.user.id)
    const updatedBody = Object.assign({}, req.body, {
      createdBy: req.user.id
    })
    config.body = JSON.stringify(updatedBody)
    console.log('what is config', config)

    request(config).then(res => {
      console.log('what is res', res)
      return JSON.parse(res)
    }, errRes => {
      console.log('error res', errRes)
      return errRes.error ? JSON.parse(errRes.error) : errRes
    }).then(jsonData => {
      console.log('what is jsonData', jsonData)
      const quoteObj = Object.assign({}, req.body, {
        createdBy: req.user.id
      })

      if (jsonData.ok) {
        quoteObj['annual_premium'] = +Number.parseFloat(
          jsonData.data.annual_premium).
        toFixed(2)
        quoteObj['eligible'] = true
      }
      else {
        console.log('what is JsonData', jsonData)

        // console.log('jsondata keys', Object.keys(jsonData))
        console.log('jsonData.name', jsonData.name)
        console.log('jsonData.statusCode',jsonData.statusCode )
        console.log('jsonData.message',jsonData.message)
        console.log('jsonData.error',jsonData.error )
        console.log('jsonData.options',jsonData.options )
        console.log('jsonData.response',jsonData.response )
        // console.log('jsondata.error', jsonData.error)
        // console.log('what is JSON.parse(JsonData)', JSON.parse(jsonData))

        quoteObj['eligible'] = false
        quoteObj['declined_reasons'] = jsonData.errors || jsonData.error.errors
      }
      console.log('what is quotesObj', quoteObj)
      console.log('what is quotesObj[declined_reasons]',
        quoteObj['declined_reasons'])
      return new Quote(quoteObj).save()
    }).then(createdQuote => {
      console.log('what is createdQuote', createdQuote)
      const eligibility = createdQuote.eligible ? 'Eligible' : 'Ineligible'
      const emailOptions = {  // email options
        from: environment.EMAIL.user,
        to: updatedBody.broker_email, // receiver
        subject: `Xavier Quote Confirmation - ${eligibility}`, // subject
        text: `Hi ${updatedBody.owner_name}. 
          
          This is a confirmation that your quote request has been received and the Jet is ${eligibility}. Please see the details of your quote below: 
          
        Model: ${updatedBody.model},
        Seat Capacity: ${updatedBody.seat_capacity},
        Manufactured Date: ${updatedBody.manufactured_date},
        Purchase Price: ${updatedBody.purchase_price}` // body
      }
      utility.security.smtpTransport.sendMail(emailOptions, (err, response) => {
        if (err) {
          console.log('nodemailer error', err)
        }
        else {
          console.log('Message sent: ' + response)
          res.send({response})
        }

        utility.security.smtpTransport.close()
      })

      res.status(200)

      res.json({
        quote: createdQuote,
        success: true,
        message: createdQuote.eligible
          ? `Annual Premium is ${createdQuote.annual_premium}`
          : `Not Eligible for Coverage`
      })
      console.log('still running here?')
    }).catch(err => {
      console.log('quote error', err)
      res.json({
        message: `Error Creating Quote`
      })
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
    // request(config).then(res => {
    //   res = JSON.parse(res)

    // new Quote(quoteObj).save

  }

  return {
    createQuote
  }
}