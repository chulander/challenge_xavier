'use strict'

module.exports = function () {
  return {
    presets: [
      'react',
      // 'env',
      [
        'env', {
        targets: {
          browsers: 'last 2 versions'
        },
        loose: true,
        modules: false
      }]
      // {'modules': false}
      // 'stage-0',
      // 'stage-1',
      // 'react-app'
    ],
    plugins: [
      // 'transform-runtime',
      // 'react-css-modules',
      // 'transform-class-properties',
      'react-hot-loader/babel',
      'transform-object-rest-spread',
      'transform-class-properties'
    ],
    env: {
      development: {
        plugins: [
          'transform-es2015-modules-commonjs'
        ]
      },
      test: {
        plugins: [
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  }
}
