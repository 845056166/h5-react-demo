const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        // enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: /src/,
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    })
  ],
  devServer: {
    port: 3005,
    contentBase: './dist',
    quiet: true,
  },
  devtool: 'source-map'
}