var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'src', 'js', 'entry.js'),
  output: {
    path: path.join(__dirname, 'build'),
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
