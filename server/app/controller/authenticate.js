// 'use strict'
// const expressJwt = require('express-jwt')
//
// module.exports = function (app) {
//   const environment = app.getValue('environment')
//   const checkToken = expressJwt({secret: environment.JWT.secret})
//
//   const decodeToken = function decodeToken (req, res, next) {
//     /*
//      optional query string check for token
//      */
//     if (req.query && req.query.hasOwnProperty('access_token')) {
//       req.headers.authorization = `Bearer ${req.query.access_token}`
//     }
//     // express-jwt will call next if token is valid
//     // sends error if token is invalid
//     // will attached decoded token to req.user
//     checkToken(req, res, next)
//   }
//
//   return {
//     decodeToken
//   }
// }
