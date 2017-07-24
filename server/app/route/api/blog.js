const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Blog = mongoose.model('Blog')
module.exports = function (app) {

  const utility = app.getValue('utility')
  blogRouter.get('/', function (req, res) {
    console.log('what is res.io', res.io)
    console.log('inside blog getting')
    Blog.find({}).exec().then(blogs => {
      console.log('what is blogs', blogs)
      res.status(200)
      res.json({
        blogs
      })
    }).catch(err => {
      res.json({message: err.message})
    })
  })
  blogRouter.post('/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      const blog = new Blog(Object.assign({},
        req.body, {
          createdBy: req.user.id
        }))
      blog.save().then(newBlog => {
        res.io.sockets.in('news').emit('new blog', newBlog)
        res.status(200)
        res.json({
          blog: {
            title: newBlog.title,
            message: newBlog.message,
            // id: utility.security.encodeBase64(newBlog.id)
            id: newBlog.id
          },
          success: true,
          message: `Created blog "${newBlog.name}"`
        })
      }).catch(err => {
        res.json({
          success: false,
          message: /duplicate/.test(err.message)
            ? `${req.body.title} already exists`
            : err.message
        })
      })
    })
  blogRouter.delete('/:blogId', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // const mongoId = utility.security.decodeBase64(req.params.blogId)
      const blogId = req.params.blogId
      console.log('what is req.params.blogId', req.params.blogId)
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      // Blog.findById(req.params.blogId).exec()
      Blog.remove({_id: blogId}).exec().then(() => {
        res.io.sockets.in('news').emit('delete blog', blogId)
        res.json({
          success: true,
          message: `Deleted blog`
        })
      }).catch(err => {
        res.json({
          success: false,
          message: err.message
        })
      })
    })

  blogRouter.put('/:blogId', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      // const mongoId = utility.security.decodeBase64(req.params.blogId)
      const blogId = req.params.blogId
      console.log('what is req.params.blogId', req.params.blogId)
      console.log('what is req.body', req.body)
      console.log('what is req.user', req.user.id)
      // Blog.findById(req.params.blogId).exec()
      Blog.findByIdAndUpdate(blogId, req.body, {new: true}
      ).exec().then(updatedBlog => {
        res.io.sockets.in('news').emit('update blog', updatedBlog)
        res.json({
          success: true,
          message: `Updated a blog`
        })
      }).
      catch(err => {
        res.json({
          success: false,
          message: err.message
        })
      })
    })

  return blogRouter
}