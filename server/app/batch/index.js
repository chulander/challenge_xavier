'use strict'
const mongoose = require('mongoose')
const Quote = mongoose.model('Quote')
const moment = require('moment')
const {CronJob} = require('cron')
const numeral = require('numeral')
module.exports = function (app) {
  const environment = app.getValue('environment')
  const utility = app.getValue('utility')

  new CronJob('0 1 * * * *', function () {
    console.info('running the cron job once an hour')
    const currentTime = moment().subtract(1, 'hours').format()
    Quote.find({
      createdAt: {
        $gte: currentTime
      },
      eligible: {
        $eq: true
      }
    }).exec().then(quotes => {
      return quotes.reduce((cur, next) => {
        if (!cur[next.broker_email]) {
          cur[next.broker_email] = [next]
        }
        else {
          cur[next.broker_email].push(next)
        }
        return cur
      }, {})
    }).then(brokerQuotes=>{
      Object.keys(brokerQuotes).forEach(broker=>{
        const quotes = brokerQuotes[broker]
        const output = quotes.map((quote,index)=> {
          return `Quote ${index+1}: {${quote.owner_name}}, {${quote.model}}, {${numeral(quote.annual_premium).format('$0,0.00')}, {${quote.createdAt}}`
        })
        const emailOptions = {  // email options
          from: environment.EMAIL.user,
          to: broker, // receiver
          subject: `Xavier Quote Summary`, // subject
          text: `Hi, 
        
        ${output}          
        `
        }
        utility.security.smtpTransport.sendMail(emailOptions,
          (err, response) => {
            if (err) {
              console.log('nodemailer error', err)
            }
            // else {
            //   console.log('Message sent: ' + response)
            // }

            utility.security.smtpTransport.close()
          })

      })
    })
    .catch(err => {
      console.error('batch.js: what is promise.catch err', err)
    })

  }, null, true, 'America/New_York')


}
