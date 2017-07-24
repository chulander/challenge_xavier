'use strict'
const path = require('path')

const {name: appName} = require(`${path.join(__dirname, '../../package.json')}`)

const {getDomainUri, CreateConfig} = require('./utility')

// fully qualified domain name
const rootPath = path.join(__dirname, '../../')

const options = {
  rootPath,
  environment: 'production',
  web: CreateConfig({
    PROTOCOL: 'http',
    PORT: '3001',
    // HOSTNAME: `${appName}.io`
    HOSTNAME:'localhost'
  }),
  database: CreateConfig({
    PROTOCOL: 'mongodb',
    PORT: '27017',
    HOSTNAME: appName
    // URI: getDomainUri.call(this)
  }),
  PUBLIC_PATH: '/',
  ASSET_LOCATION: '/client/src/assets',
  getDomainUri: getDomainUri,
  JWT: {
    secret: 'chulander engine chu',
    expiresIn: '2h'
  },
  GENERAL: {
    secret: 'anything goes' // should be NODE_ENV variable
  },
  QUOTE: {
    apiKey: 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p', // should be NODE_ENV variable
    url: 'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge' // should be NODE_ENV variable
  },
  EMAIL: {
    secret: 'prhs svvx ndky kjax', // should be NODE_ENV variable
    user: 'demo.env.only@gmail.com'
  },
  LOGGING: true,
}
//
// const handlers = {
//   get(target, key, context){
//     // note: target === obj
//     // context === proxied obj
//     // console.log('target is', target)
//
//     console.log('what is key', key)
//     if (key === 'URI') {
//       console.log('accessing key', key)
//       Reflect.apply(getDomainUri, target.web)
//     }
//     else {
//       return Reflect.get(
//         target, key, context
//       )
//     }
//
//   }
// }

// module.exports = new Proxy(options, handlers)
module.exports = options
