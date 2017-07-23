const groupRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Group = mongoose.model('Group')
module.exports = function (app) {

  const utility = app.getValue('utility')
  groupRouter.post('/', passport.authenticate('jwt', {session: false}),function (req, res) {
    // console.log('what is req.body', req.body)
    // console.log('what is req.user', req.user.id)
    const group = new Group(Object.assign({},
      req.body,{
        createdBy:req.user.id
      }))
    group.save()
    .then(data=>{
      res.io.sockets.in('groups').emit('new group', data)
      res.json({
        group: {
          name: data.name,
          id: utility.security.encodeBase64(data.id)
        },
        success:true,
        message: `Created group "${data.name}"`
      })
    })
    .catch(err=>{
      res.json({
        success:false,
        message: /duplicate/.test(err.message) ? `${req.body.name} already exists` : err.message
      })
    })

  })
  groupRouter.get('/', function(req,res){
    console.log('what is res.io', res.io)
    Group.find({}).exec()
    .then(groups=>{
      console.log('what is groups', groups)
      res.json(groups)
    })
    .catch(err=>{
      res.json({message: err.message})
    })
  })
  return groupRouter
}