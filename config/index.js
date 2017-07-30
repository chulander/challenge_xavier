/* eslint-disable global-require, import/no-dynamic-require */
const minimist = require('minimist')
const path = require('path')

const babelPath = require(path.join(__dirname, './babel'))
const args = minimist(process.argv)
const envPath = path.join(__dirname, './environment')

module.exports = function(env) {
  // webpack dev_middleware will pass in an argument
  // npm start scripts will use the args.env
  const runningEnvironment = env ? Object.keys(env)[0] : args.env

  // setting processing env
  process.env.NODE_ENV = runningEnvironment

  const environment = require(envPath)[runningEnvironment]
  const config = Object.assign(
    {},
    {
      babel: babelPath,
      NODE_ENV: runningEnvironment,
      environment
    }
  )

  // console.log('environment: what is config obj inside env', config);
  return config
}
