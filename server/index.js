/* eslint-disable global-require, import/no-dynamic-require, import/newline-after-import  */
const path = require('path')
const config = require(path.join(__dirname, '../config'))()
require('babel-register')(config.babel())
require('./main')(config)
