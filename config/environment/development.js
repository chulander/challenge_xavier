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
  }),
  PUBLIC_PATH: '/',
  ASSET_LOCATION: '/client/src/assets',
  getDomainUri: getDomainUri,
  JWT: {
    secret: 'chulander engine chu',
    expiresIn: '2h'
  },
  GENERAL: {
    secret: 'anything goes'
  },
  QUOTE: {
    apiKey: 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
    url: 'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge'
  },
  EMAIL: {
    secret: 'prhs svvx ndky kjax',
    user: 'demo.env.only@gmail.com'
  },
  LOGGING: true
}
module.exports = options
