const playerRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Player = mongoose.model('Player')
module.exports = function (app) {

  const utility = app.getValue('utility')
  playerRouter.post('/', passport.authenticate('jwt', {session: false}),function (req, res) {
    // console.log('what is req.body', req.body)
    // console.log('what is req.user', req.user.id)
    const player = new Player(Object.assign({},
      req.body,{
        createdBy:req.user.id
      }))
    player.save()
    .then(data=>{
      res.io.sockets.in('players').emit('new player', data)
        res.json({
          player: {
            firstName: data.firstName,
            lastName: data.lastName,
            id: utility.security.encodeBase64(data.id)
          },
          success:true,
          message: `Created player "${data.firstName} ${data.lastName}"`
        })
    })
    .catch(err=>{
      res.json({
        success:false,
        message: /duplicate/.test(err.message) ? `${req.body.firstName} ${req.body.lastName} already exists` : err.message
      })
    })

  })
  playerRouter.get('/', function(req,res){
    console.log('what is res.io', res.io)
    Player.find({}).exec()
    .then(players=>{
      console.log('what is players', players)
      res.json(players)
    })
    .catch(err=>{
      res.json({message: err.message})
    })
  })
  return playerRouter
}