const blogRouter = require('express').Router()
const passport = require('passport')

module.exports = function (app) {

  const controller = app.getValue('controller')
  blogRouter.get('/', controller.blog.getBlogs)
  blogRouter.post('/', passport.authenticate('jwt', {session: false}), controller.blog.createBlog)
  blogRouter.delete('/:blogId', passport.authenticate('jwt', {session: false}), controller.blog.deleteBlog)
  blogRouter.put('/:blogId', passport.authenticate('jwt', {session: false}), controller.blog.updateBlog)

  return blogRouter
}