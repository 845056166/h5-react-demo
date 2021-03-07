const path = require('path')
const { merge } = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackConfig = require('./webpack.config')
// const getEnv = require('./utils/getEnv')

// const CONFIG_ENV = getEnv()

// const config = require('../config')[CONFIG_ENV]
const config = { env: 'development',
  mode: 'development',
  port: 3005,
  proxyHost: 'http://test.example.com',
  output: 'output',
  publicPath: '/',
  devtool: true,
  cdnPath: '//cdn.cn' 
}
module.exports = merge(webpackConfig, {
  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, '../output'),
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    https: false,
    port: config.port,
    stats: 'errors-only',
    useLocalIp: false,
    watchContentBase: true,
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  devtool: 'cheap-module-source-map',

  plugins: [new HotModuleReplacementPlugin(), 
    // new OptimizeCSSAssetsPlugin()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'async',
          enforce: true,
          minChunks: 3
        }
      }
    },
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  }
})

function proxy(proxyRes) {
  let cookies = proxyRes.headers['set-cookie']
  let cookieRegex = /Path=\/XXX\//i
  // 修改cookie Path
  if (cookies) {
    let newCookie = cookies.map(cookie => {
      if (cookieRegex.test(cookie)) {
        return cookie.replace(cookieRegex, 'Path=/')
      }
      return cookie
    })
    // 修改cookie path
    delete proxyRes.headers['set-cookie']
    proxyRes.headers['set-cookie'] = newCookie
  }

  if (proxyRes.headers.location) {
    proxyRes.headers.location = proxyRes.headers.location.replace(
      config.proxyHost,
      `http://127.0.0.1:${config.port}`
    )
  }
}
