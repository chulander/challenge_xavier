'use strict'

module.exports = function (app) {
  // mounting dev middleware
  // console.log("inside webpack index middleware app.getValue('env')", app.getValue('env'));
  if (app.getValue('env').ENVIRONMENT === 'production') {
    // const useWebpackMiddleware = app.getValue('env').useWebpackMiddleware
    // console.log('using webpack prod middleware')
    require('./prod-middleware')(app)
    // useWebpackMiddleware(app)
    // webpackDev(app)
  } else {
    console.log('using webpack dev middleware')
    require('./dev-middleware')(app)
  }
}
