'use strict'

'use strict'
const crypto = require('crypto')
const mongoose = require('mongoose')
const _ = require('lodash')

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  firstName: String,
  password: {
    type: String
  },
  salt: {
    type: String
  },
  createdByUserAgent: {
    type: String
  },
  createdByIp: {
    type: String
  }
}, {
  timestamps: true
})

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt'])
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
const generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

const encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1')
  hash.update(plainText)
  hash.update(salt)
  return hash.digest('hex')
}

schema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt()
    this.password = this.constructor.encryptPassword(this.password, this.salt)
  }

  next()
})

schema.statics.generateSalt = generateSalt
schema.statics.encryptPassword = encryptPassword

schema.method('correctPassword', function (candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password
})
schema.method('getFullName', function () {
  return `${this.firstName} ${this.lastName}`
})
schema.method('getPhoto', function () {
  return this.facebook.photo
})
mongoose.model('User', schema)
