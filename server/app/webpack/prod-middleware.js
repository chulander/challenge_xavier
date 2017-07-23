// import React from 'react'
// import { match } from 'react-router'
// import { renderToString } from 'react-dom/server'
// import { RouterContext } from 'react-router'
//
// import { syncHistoryWithStore } from 'react-router-redux'
// import { createMemoryHistory } from 'react-router'
//
// import serialize from 'serialize-javascript'
// import { Provider } from 'react-redux'
// import configureStore from '../../../../client/src/global/configureStore'
// import routes from '../../../../client/src/global/routes'
//
// // enable webpack middleware for hot-reloads in development
// function useWebpackMiddleware (app) {
//   const express = require('express')
//   const clientRouter = express.Router()
//   const projectRoot = app.getValue('projectRoot')
//   // console.log('what is projectRoot', projectRoot);
//   const envOptions = app.getValue('env')
//   // console.log('what is envOptions',envOptions);
//
//   const publicPath = envOptions.PUBLIC_PATH
//   // const chutils = require('chutils');
//   // const readFileAsync = chutils.async.promisify(require('fs').readFile);
//   const fs = require('fs')
//   const assetJSON = fs.readFileSync(`${projectRoot}/client/dist/asset-manifest.json`)
//   const parsedJSON = JSON.parse(assetJSON)
//   // console.log('what is parsedJSON', parsedJSON);
//
//   clientRouter.get('/*', (req, res, next) => {
//     // console.log('inside clientRouter');
//     const webpackStats = res.locals.webpackStats.toJson()
//     // console.log('what are the webpackStats',webpackStats);
//
//     // webpackStats.assets.forEach(asset=>{
//     //   'use strict';
//     //   console.log('what is asset.name', asset.name);
//     //   console.log('what is chunks', asset.chunks);
//     //   console.log('what is chunkNames', asset.chunkNames);
//     // })
//     // console.log('appchunks', webpackStats.chunks)
//     // const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
//     // const assets = webpackStats.assets;
//     const HTML = ({ content, store }) => (
//       <html>
//         <head>
//           <meta charset='utf-8' />
//           <meta name='viewport' content='width=device-width, initial-scale=1' />
//           <link rel='shortcut icon' href='/dist/favicon.ico' />
//           {
//           Object.keys(parsedJSON)
//           .filter(assetKey => {
//             { /* console.log('what is assetKey in filter CSS', assetKey); */ }
//             return /\.css$/.test(assetKey)
//           })
//           .map(assetKey => {
//             // console.log('what is path inside CSS', assetKey);
//             const fullPath = `${publicPath}${parsedJSON[assetKey]}`
//             // console.log('css full path', fullPath);
//             return <link rel='stylesheet' href={fullPath} />
//           })
//         }
//           <title>ChuBryan.com</title>
//         </head>
//         <body>
//           <div id='root'>{content}</div>
//           <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())}` }} />
//           {
//
//         Object.keys(parsedJSON)
//         .filter(assetKey => /\.js$/.test(assetKey))
//         .sort((a, b) => {
//           if (a < b) return 1
//           if (b > a) return -1
//           return 0
//           { /* console.log('what is a', a); */ }
//           { /* console.log('what is b', b); */ }
//
//           { /* return b-a */ }
//         })
//         .map(assetKey => {
//           // console.log('what is path inside JS', assetKey);
//           const fullPath = `${publicPath}${parsedJSON[assetKey]}`
//           // console.log('js full path', fullPath);
//           return <script src={fullPath} />
//         })
//       }
//         </body>
//       </html>
//     )
//     const memoryHistory = createMemoryHistory(req.url)
//     const store = configureStore(memoryHistory)
//     const history = syncHistoryWithStore(memoryHistory, store)
//
//     match({ routes: routes(history), location: req.url }, (err, redirectLocation, renderProps) => {
//       if (err) {
//         res.status(500).send(err.message)
//       }
//       if (redirectLocation) {
//         res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//       }
//       if (!renderProps) {
//         return next(new Error('Missing render props'))
//       }
//
//       const components = renderProps.components
//
//       // If the component being shown is our 404 component, then set appropriate status
//       if (components.some((c) => c && c.displayName === 'error-404')) {
//         res.status(404)
//       }
//
//       const content = renderToString(
//         <Provider store={store}>
//           <RouterContext {...renderProps} />
//         </Provider>
//       )
//       // const body = renderToString(<RouterContext {...renderProps} />)
//
//       // const HTMLTYPE = process.env.NODE_ENV !=='production'
//       //   ? devHTML
//       //   : prodHTML
//       const body = renderToString(<HTML content={content} store={store} />)
//       res.send('<!doctype html>\n' + body)
//     })
//   })
//
//   const path = require('path')
//   const webpack = require('webpack')
//   const webpackDevMiddleware = require('webpack-dev-middleware')
//
//   // console.log('PRODDDD middleware')
//   // console.log('what is envOptions.getFullDomain()', envOptions.getFullDomain())
//   const webpackDevConfig = require(path.join(app.getValue('projectRoot'), 'config/webpack.config.js'))
//   const webpackDevCompiler = webpack(webpackDevConfig({[process.env.NODE_ENV]: true}))
//
//   const webpackConfig = require(path.join(app.getValue('projectRoot'), 'config/webpack.server.config.js'))
//   const webpackCompiler = webpack(webpackConfig({[process.env.NODE_ENV]: true}))
//
//   // console.log('inside', webpackCompiler.outputFileSystem);
//
//   app.use(webpackDevMiddleware(webpackCompiler, {
//     // proxy:{
//     //   '/api': {
//     //     target: envOptions.getFullDomain(),
//     //     secure: false
//     //   }
//     // },
//     // noInfo: false,
//     // publicPath: webpackCompiler.options.output.publicPath,
//     // stats: {
//     //   colors: true,
//     //   chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs,
//     //   timings: true,
//     //   hash:true,
//     //   'errors-only': true
//     // },
//     serverSideRender: true
//   }))
//   app.use(clientRouter)
//   // app.use(webpackHotMiddleware(webpackCompiler));
//   // app.use(webpackHotMiddleware(webpackDevCompiler));
//   // app.use(webpackHotServerMiddleware(webpackCompiler));
//   // app.use('/api/*', function(req, res) {
//   //   req.url = req.baseUrl; // Janky hack...
//   //   apiProxy.web(req, res, {
//   //     target: {
//   //       port: 3000,
//   //       host: 'localhost'
//   //     }
//   //   });
//   // });
//
//   // app.get('/*', function (req, res, next) {
//   //   const filename = path.join(webpackCompiler.outputPath,'index.html');
//   //   webpackCompiler.outputFileSystem.readFile(filename, function(err, result){
//   //     if (err) {
//   //       return next(err);
//   //     }
//   //     // res.set('content-type','text/html');
//   //     // res.header('Access-Control-Allow-Origin', '*');
//   //     // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   //     // res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//   //     // res.header("Access-Control-Allow-Origin", "*");
//   //     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   //     res.send(result);
//   //     res.end();
//   //   });
//   // });
// }
//
// module.exports = useWebpackMiddleware
