const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = function (app) {
  const environment = app.getValue('environment')

  function signToken (id) {
    return jwt.sign(
      {_id: id},
      environment.JWT.secret,
      {expiresIn: environment.JWT.expiresIn}
    )
  }
  function verifyToken(token){
    jwt.verify(token, environment.JWT.secret, function(err, decoded){
      console.log('verifyToken what is decoded', decoded)
      if(err){
        console.log('verifyToken error', err)
        return false
      } else {
        return decoded
      }
    })
  }
  function encodeBase64(value){
    const cipher = crypto.createCipher('aes-256-ctr', environment.GENERAL.secret)
    let encrypted = cipher.update(value, 'utf-8', 'binary')
    encrypted+=cipher.final('binary')
    return encrypted
  }
  function decodeBase64(value){
    const decipher = crypto.createDecipher('aes192', environment.GENERAL.secret)
    let decrypted = decipher.update(value, 'binary', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
  }
  return {
    signToken,
    verifyToken,
    decodeBase64,
    encodeBase64
  }
}
