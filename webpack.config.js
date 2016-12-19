var path = require('path')
var extension = path.join(__dirname, 'extension')
var webpack = require('webpack')

module.exports = {
  entry: path.join(extension, 'js', 'entry.js'),
  output: {
    path: path.join(extension, 'dist'),
    filename: 'bundle.js'
  },
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
