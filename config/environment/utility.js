'use strict'
// fully qualified domain name
const getDomainUri = function () {
  const value = `${this.PROTOCOL}://${this.HOSTNAME}`
  return (this.PORT)
    ? `${value}:${this.PORT}`
    : value
}

const baseClass = {
  get URI () {
    return getDomainUri.call(this)
  }
}

const CreateConfig = function CreateConfig (options) {
  return Object.assign(Object.create(baseClass), options)
}
module.exports = {
  getDomainUri,
  CreateConfig
}
