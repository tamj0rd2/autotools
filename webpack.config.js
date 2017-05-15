const webpack = require('webpack')
const R = require('ramda')

let baseConfig = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

let extension = (paths, globs) => {
  let config = R.clone(baseConfig)
  config.entry = `${paths.src}/extension/entry.js`
  config.output = { filename: globs.extension.filename }

  return config
}

let popup = (paths, globs) => {
  let config = R.clone(baseConfig)
  config.entry = `${paths.src}/popup/popup.js`
  config.output = {filename: globs.popup.filename}

  return config
}

module.exports = { extension, popup }
