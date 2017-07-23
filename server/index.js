'use strict'
const path = require('path')
const config = require(path.join(__dirname, '../config'))()
require('babel-register')(config.babel())
require('./main')(config)
