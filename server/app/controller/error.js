'use strict'
const path = require('path')

const catchFileExtensionError = function catchFileExtensionError (req, res, next) {
  /*
   This middleware will catch any URLs resembling a file extension
   for example: .js, .html, .css
   This allows for proper 404s instead of the wildcard '/*' catching
   URLs that bypass express.static because the given file does not exist.
   */
  if (path.extname(req.path).length > 0) {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
  } else {
    next()
  }
}

const catchAllError = function catchAllError (err, req, res, next) {
  console.log('inside global catch all error')
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
}

module.exports = function (app) {
  return {
    catchFileExtensionError,
    catchAllError
  }
}
