'use strict'

const autoprefixer = require('autoprefixer')
// const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const fs = require('fs');
// const precss = require('precss');
// const postcssImport = require('postcss-import');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const path = require('path')
const projectRoot = path.join(__dirname, '../../')
const clientSrcPath = path.join(projectRoot, 'client/src')
const clientDistPath = path.join(projectRoot, 'client/dist')
const babelConfig = require('../babel')
module.exports = (env, target) => {
  // console.log("what is babelConfig().presets", babelConfig().presets)
  // console.log("what is require.resolve('babel-plugin-transform-runtime')", require.resolve('babel-plugin-transform-runtime'))
  // console.log('what is env', env)
  const config = require(path.join(__dirname, '../environment'))[Object.keys(env)[0]]

  // console.log('what is config.web.URI', config.web.URI)

  // console.log('what is full url', config.getFullUrl());
  const GLOBALS = {
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_ROUTE': process.env.NODE_ENV === 'production'
        // ? JSON.stringify(`${config.HTTP_PROTOCOL}://${config.URL}`)
        ? JSON.stringify(config.web.URI)
        : JSON.stringify(config.web.URI)
    }
  }

  // console.log('WHAT IS ENV', env)
  return {
    // context: path.join(__dirname, 'src'),
    name: 'client',
    target: 'web',
    devtool: env.development ? 'cheap-eval-source-map' : 'source-map',
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // entry: {
    //   vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux'],
    //   app: [
    //     require.resolve('react-dev-utils/webpackHotDevClient'),
    //     path.resolve(__dirname, 'src/index')
    //   ]
    // },
    entry: env.development
      ? [
        `react-hot-loader/patch`,
        `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true`,
        // `webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&overlay=false&timeout=2000`,
        // `webpack-hot-middleware/client?path=/__webpack_hmr&reload=truetimeout=2000`,
        `${clientSrcPath}/ClientApp`
      ]
      : {
        app: `${clientSrcPath}/ClientApp`,
        vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux']
      },
    output: env.development
      ? {
        path: clientDistPath,
        filename: 'bundle.js',
        publicPath: '/'
        // publicPath: 'http://localhost:1337/js/'
      }
      : {
        path: clientDistPath,
        // filename: 'bundle.js',
        // filename: '[name].js',
        // chunkFilename: '[id].js',
        // filename: '[chunkhash].[name].js',
        // filename: '[name].[chunkhash:8].js',
        filename: '[name].js',
        // chunkFilename: '[name].[chunkhash:8].chunk.js',
        // chunkFilename: '[name].js',
        publicPath: '/'
      },
    module: {
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        // { parser: { requireEnsure: false } },
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        // {
        // {
          // set up standard-loader as a preloader
          // enforce: 'pre',
          // test: /\.jsx?$/,
          // loader: 'standard-loader',
          // exclude: /(node_modules|bower_components)/,
          // options: {
            // Emit errors instead of warnings (default = false)
            // error: false,
            // enable snazzy output (default = true)
            // snazzy: true
            // other config options to be passed through to standard e.g.
            // parser: 'babel-eslint'
          // }
        // },
        //   test: /\.(js|jsx)$/,
        //   enforce: 'pre',
        //   // use: [{
        //   //   // @remove-on-eject-begin
        //   //   // Point ESLint to our predefined config.
        //   //   options: {
        //   //     // TODO: consider separate config for production,
        //   //     // e.g. to enable no-console and no-debugger only in production.
        //   //     configFile: path.join(__dirname, '.eslintrc.json'),
        //   //     useEslintrc: false
        //   //   },
        //   //   // @remove-on-eject-end
        //   //   loader: 'eslint-loader'
        //   // }],
        //   use: [{
        //     loader: 'semistandard'
        //   }],
        //   exclude: /node_modules/,
        //   include: path.join(clientSrcPath, 'src')
        // },
        // ** ADDING/UPDATING LOADERS **
        // The "url" loader handles all assets unless explicitly excluded.
        // The `exclude` list *must* be updated with every change to loader extensions.
        // When adding a new loader, you must add its `test`
        // as a new entry in the `exclude` list for "url" loader.

        // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
        // Otherwise, it acts like the "file" loader.
        // "file" loader for svg
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
          ],
          test:/\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            // name: '[name].[hash:8].[ext]'
            // name: '[name].[ext]'
            name:'file?name=public/fonts/[name].[ext]'
            // name: '/[name].[ext]'
          }
        },
        // "url" loader works just like "file" loader but it also embeds
        // assets smaller than specified size as data URLs to avoid requests.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            // name: '[name].[hash:8].[ext]',
            name: '[name].[ext]'
          }
        },
        {
          test: /\.(js|jsx)$/,
          include: clientSrcPath,
          // exclude: /(node_modules)/,
          // include: 'src',
          use: [
            // {
            //   loader:'react-hot-loader/webpack'
            // },
            {
              loader: 'babel-loader',
              // @remove-on-eject-begin
              // exclude: /(node_modules)/,
              options: Object.assign({}, babelConfig(), {
                babelrc: false,
                // presets: [
                //   require.resolve('babel-preset-stage-2'),
                //   require.resolve('babel-preset-react'),
                //   require.resolve('babel-preset-es2015'),
                //   // require.resolve('babel-preset-stage-0'),
                //   // require.resolve('babel-preset-stage-1'),
                //
                //   // require.resolve('babel-preset-react-app')
                // ],
                // presets: babelConfig().presets,
                // plugins:
                cacheDirectory: !!env.development
              })
            }
          ]
          // @remove-on-eject-end
        },

        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        {
          test: /\.s?css$/,
          use: env.development
            ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                  plugins: function () {
                    return [
                      // require('precss'),
                      // require('postcss-import'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 2 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ]
                      })
                    ]
                  }
                }
              },
              {
                loader:'sass-loader'
              }
            ]
            : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                    // modules:true,
                  }
                }, {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: function () {
                      return [
                        // require('precss'),
                        // require('postcss-import'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 2 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                          ]
                        })
                      ]
                    }
                  }
                }
              ]
            })
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          options: {
            // name: '[name].[hash:8].[ext]'
            name: '[name].[ext]'
          }
        }
        // ** STOP ** Are you adding a new loader?
        // Remember to add the new extension(s) to the "url" loader exclusion list.
      ]
    },
    plugins: env.development
      ? [
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        // new InterpolateHtmlPlugin(config),
        // Generates an `index.html` file with the <script> injected.
        // new HtmlWebpackPlugin({
        //   inject: true,
        //   template: `${clientSrcPath}/index.html`,
        //   filename: 'index.html',
        // }),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(GLOBALS),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, 'node_modules'))
        // new webpack.NoEmitOnErrorsPlugin()
        // new WatchMissingNodeModulesPlugin('node_modules')
      ]
      : [
        new InterpolateHtmlPlugin(config),
        // Generates an `index.html` file with the <script> injected.
        // new HtmlWebpackPlugin({
        //   inject: true,
        //   template: `${clientSrcPath}/index.html`,
        //   filename: 'index.html',
        //   // template: 'config/templateRender.js',
        //   title: 'yo yo',
        //   minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeRedundantAttributes: true,
        //     useShortDoctype: true,
        //     removeEmptyAttributes: true,
        //     removeStyleLinkTypeAttributes: true,
        //     keepClosingSlash: true,
        //     minifyJS: true,
        //     minifyCSS: true,
        //     minifyURLs: true
        //   }
        // }),
        new webpack.DefinePlugin(GLOBALS),
        new CaseSensitivePathsPlugin(),
        new ExtractTextPlugin('style.css'),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        // new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          },
          sourceMap: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new ExtractTextPlugin('style.css'),
        // new ExtractTextPlugin('[name].css')
        new ManifestPlugin({
          fileName: 'asset-manifest.json'
        })
      ],
    // Some libraries import Node modules but don't use them in the browser.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    // Tell Webpack to provide empty mocks for them so importing them works.
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
      hints: env.development ? false : 'warning'
    },
    devServer: {historyApiFallback: true}
  }
}
