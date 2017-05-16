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
  let fontPath = 'name=./fonts/[hash].[ext]'
  let loaders = [
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: `url-loader?limit=10000&mimetype=application/font-woff&${fontPath}`
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: `url-loader?limit=10000&mimetype=application/octet-stream&${fontPath}`
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: `file-loader?${fontPath}`
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: `url-loader?limit=10000&mimetype=image/svg+xml&${fontPath}`
    }
  ]

  config.entry = `${paths.src}/popup/popup.js`
  config.output = {filename: globs.popup.filename}
  config.module.loaders = R.concat(config.module.loaders, loaders)
  return config
}

module.exports = { extension, popup }
