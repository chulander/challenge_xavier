const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')
const fs = require('fs')
const path = require('path')
const clientRouter = express.Router()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const _ = require('lodash')
const serialize = require('serialize-javascript')
function useWebpackMiddleware (app) {
  const config = app.getValue('environment')
  console.log('webpackdevmiddleware', config.web.URI)
  // console.log('what is ReactApp', ReactApp)
  const webpackConfig = require(
    path.join(config.rootPath, 'config/webpack/webpack.dev.config.js'))
  const webpackCompiler = webpack(webpackConfig({[process.env.NODE_ENV]: true}))

  const baseTemplate = fs.readFileSync(
    path.join(config.rootPath, 'client/src/index.html'))
  const template = _.template(baseTemplate)
  const ReactApp = require(path.join(config.rootPath, 'client/src/App')).default
  clientRouter.use((req, res, next) => {
    const initialState = {
    }
    const context = {}
    const body = ReactDOMServer.renderToString(
      React.createElement(StaticRouter, {location: req.url, context},
        React.createElement(ReactApp))
    )

    if (context.url) {
      res.redirect(context.url)
    }

    res.write(template({
      body: body,
      initialState: serialize(initialState, {isJSON: true})
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
    })
    )
    res.end()
  })

  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackCompiler.options.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // serverSideRender: true/**/
  }))
  app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log,
    path: `/__webpack_hmr`,
    heartbeat: 20 * 1000
  }))
  app.use(clientRouter)

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  webpackCompiler.plugin('done', function () {
    console.log('Clearing /client/ module cache from server')
    Object.keys(require.cache).forEach(function (id) {
      if (/[/\\]client[/\\]/.test(id)) {
        // console.log('what is client module id to be deleted', id)
        delete require.cache[id]
      }
    })
  })
}

module.exports = useWebpackMiddleware
