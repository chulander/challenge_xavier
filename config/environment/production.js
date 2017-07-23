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
    PORT: '3000',
    HOSTNAME: `${appName}.io`
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
