'use strict'
const minimist = require('minimist')
const args = minimist(process.argv)
const path = require('path')

module.exports = function (env) {
  // webpack dev_middleware will pass in an argument
  // npm start scripts will use the args.env
  const runningEnvironment = env
    ? Object.keys(env)[0]
    : args.env

  // setting processing env
  process.env.NODE_ENV = runningEnvironment

  const environment = require(path.join(__dirname, './environment'))[runningEnvironment]
  const config = Object.assign({}, {
    babel: require(path.join(__dirname, './babel')),
    NODE_ENV: runningEnvironment,
    environment
  })

  // console.log('environment: what is config obj inside env', config);
  return config
}
