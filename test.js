const fetch = require('node-fetch')
const {Headers, Request} = require('node-fetch')
const http = require('http')
const request = require('request')
const postOptions = {
  hostname: 'j950rrlta9.execute-api.us-east-2.amazonaws.com',
  path: '/v1/ArgoChallenge/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
  }
}

var testData = {
  owner_name: 'test test',
  model: 'CessnaA-37 Dragonfly',
  seat_capacity: 5,
  manufactured_date: '2017-04-01T04:00:00.000Z',
  purchase_price: 5000,
  broker_email: 'test@mail.com'
}
var jsonData = JSON.stringify(testData)
//
// fetch(
//   'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge/',
//   {
//     method: "POST",
//     // headers: {
//     //   "x-api-key": "L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p"
//     // },
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       'mode':'cors',
//        'cache':  'default',
//       'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
//     }),
//     body: jsonData
//   }).then(res => {
//   // console.log('what is res.headers', res.headers)
//   console.log('what is res', res)
//
// }).catch(err => {
//   console.log('what is err', err)
// })

var headers = {
  'Content-Type': 'application/json',
  'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
}
var options = {
  url:  'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge',
  method:'POST',
  headers: headers,
  body: jsonData
}

request(options, function (err,res,body){
  if(err){
    console.log('what is err')
  } else {
    console.log(res)
  }
})

var apiHeaders = new Headers()
apiHeaders.append('x-api-key', 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p')
apiHeaders.append('Content-Type', 'application/json')

// console.log('what is apiHeaders', apiHeaders)
// var req = new Request(
//   'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge', {
//     // headers: new Headers({
//     //   'Content-Type': 'application/json',
//     //   'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
//     // }),
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
//     },
//     method: 'POST',
//     mode: 'cors'
//   })
// console.log('what is req', req.headers)
// fetch(request)
// .then(res => {
//   console.log('what is res', res)
// }).catch(err => {
//   console.log('what is err', err)
// })
//
//
// const req = http.request(postOptions, (res) => {
//   console.log('STATUS: ' + res.statusCode)
//   console.log('HEADERS: ' + JSON.stringify(res.headers))
//   let responseData = ''
//   res.setEncoding('utf8')
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk)
//     responseData += chunk
//   })
//   res.on('end', function () {
//     console.log('what is final response', responseData)
//   })
// })
// req.on('error', (e) => {
//   console.log('issue!', e.message)
// })
// req.write(jsonData)
//
// req.end()
//
