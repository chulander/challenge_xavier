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
const {AppContainer} = require('react-hot-loader')
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
  // console.log('what is baseTemplate', baseTemplate.toString())
  const template = _.template(baseTemplate)
  // var filename = path.join(webpackCompiler.outputPath, 'index.html')
  // console.log('what is filename bryan', filename)
  // const assetJSON = fs.readFileSync(`${config.rootPath}/client/dist/asset-manifest.json`)
  // const parsedJSON = JSON.parse(assetJSON)
  const ReactApp = require(path.join(config.rootPath, 'client/src/App')).default
  clientRouter.use((req, res, next) => {
    const initialState = {
      // drawer: {
      //   isDrawerOpen: true
      // }
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
        // initialState: JSON.stringify(initialState).replace(/</g, '\\u003c'),
        // initialState: JSON.stringify(initialState).replace(/</g, '\\u003c'),
      initialState: serialize(initialState, {isJSON: true})
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        //  window.__PRELOADED_STATE__ = ${JSON.stringify(<%= initialState %>).replace(/</g, '\\u003c')}
    })
    )

    res.end()
  })
  // clientRouter.get('*', function (req, res, next) {
  //   const ReactApp = require(path.join(config.rootPath, 'client/src/AppIndex')).default
  //   const webpackStats = res.locals.webpackStats.toJson()
  //
  //   const assetsByChunkName = webpackStats.assetsByChunkName
  //   // console.log('what is assestsByChunkName', assetsByChunkName)
  //
  //   const bundleName = assetsByChunkName.main
  //   const bundle = bundleName
  //
  //   // const bundle = !Array.isArray(bundleName)
  //   //   ? `${bundleName}`
  //   //   : `${bundleName[0]},${bundleName[1]}`
  //
  //   // console.log('what is bundle', bundle)
  //
  //   const HTML = (content) => (
  //     <html lang="en">
  //     <head>
  //       <meta charSet="utf-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       <link rel="shortcut icon" href="/dist/favicon.ico" />
  //       <title>ChuBryan.com</title>
  //     </head>
  //     <body>
  //     <div id="root" dangerouslySetInnerHTML={ {__html: content}} />
  //     <script src={bundle} />
  //     </body>
  //     </html>
  //   )
  //   const context = {}
  //   // const dom = (<StaticRouter
  //   //   location={req.url}
  //   //   context={context}
  //   // >
  //   //   <ReactApp />
  //   // </StaticRouter>)
  //
  //   // const dom = (
  //   //   React.createElement(AppContainer, {},
  //   //     React.createElement(StaticRouter, {
  //   //         location: req.url,
  //   //         context: context
  //   //       },
  //   //       React.createElement(ReactApp)
  //   //     )
  //   //   )
  //   // )
  //   const markup = <AppContainer>
  //     <StaticRouter
  //       location={req.url}
  //       context={context}
  //     >
  //       <ReactApp />
  //     </StaticRouter>
  //   </AppContainer>
  //
  //   const dom = ReactDOMServer.renderToString(markup)
  //
  //   // const body = ReactDOMServer.renderToString(React.createElement(AppContainer, {},
  //   //   React.createElement(StaticRouter, {
  //   //       location: req.url,
  //   //       context: context
  //   //     },
  //   //     React.createElement(ReactApp)
  //   //   )
  //   // ))
  //   if (context.url) {
  //     console.log('what is context.url', context.url)
  //     res.writeHead(301, {
  //       Location: context.url
  //     })
  //     res.end()
  //   }
  //   else {
  //     const final = ReactDOMServer.renderToStaticMarkup(HTML(dom))
  //     // const final = ReactDOMServer.renderToString(<HTML content={markup} />)
  //     res.end(final)
  //     //}
  //   }
  //   // const dom = ReactDOMServer.renderToString(HTML(markup))
  //   // console.log('should send markup', dom)
  //   // res.send('<!doctype html>\n' + dom)
  // })
  // app.use(environment.PUBLIC_PATH, express.static(publicPath))
  // console.log('webpackCompiler.options.output.publicPath',
  //   webpackCompiler.options.output.publicPath)
  // console.log('webpackConfig.output.publicPath',webpackConfig.output.publicPath)
  app.use(webpackDevMiddleware(webpackCompiler, {
    // proxy:{
    //   '/api': {
    //     target: envOptions.getFullDomain(),
    //     secure: false
    //   }
    // },
    // noInfo: false,
    // publicPath: `${config.web.URI}/${webpackCompiler.options.output.publicPath}`,
    publicPath: webpackCompiler.options.output.publicPath,
    hot: true,
    historyApiFallback: true,
    serverSideRender: false
    // port: config.web.PORT,
    // index:'index.html',
    // stats: {
    //   colors: true,
    //   // chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs,
    //   // timings: true,
    //   // hash: true,
    //   // hot:true,
    //   'errors-only': true
    // },
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true
    // },
    // stats: {
    //   color: true,
    //   hash: false,
    //   timings: true,
    //   chunks: false,
    //   chunkModules: false,
    //   modules: false
    // },
    // serverSideRender: true
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
        console.log('what is client module id to be deleted', id)
        delete require.cache[id]
      }
    })
  })
}

module.exports = useWebpackMiddleware
