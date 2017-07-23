'use strict'
const path = require('path')

const {name: appName} = require(`${path.join(__dirname, '../../package.json')}`)

const {getDomainUri, CreateConfig} = require('./utility')

// fully qualified domain name
const rootPath = path.join(__dirname, '../../')

const options = {
  appName,
  rootPath,
  environment: 'development',
  web: CreateConfig({
    PROTOCOL: 'http',
    PORT: '3000',
    HOSTNAME: 'localhost'
  }),
  database: CreateConfig({
    PROTOCOL: 'mongodb',
    PORT: '27017',
    HOSTNAME: 'localhost'
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
module.exports = options
