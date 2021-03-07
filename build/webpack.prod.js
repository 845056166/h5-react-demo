const path = require('path')
const { merge } = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ids } = require('webpack')
const webpackConfig = require('./webpack.config')
// const getEnv = require('./utils/getEnv')

// const CONFIG_ENV = getEnv()

// const config = require('../config')[CONFIG_ENV]
const config = { env: 'test1',
  mode: 'production',
  output: 'output',
  publicPath: '//cdn.cn/demo/',
  devtool: false,
  cdnPath: '//cdn.cn',
  host: 'http://cdn.com'
}
// if (process.env.analyzer === 'true') {
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = merge(webpackConfig, {
  entry: './index.tsx',

  output: {
    filename: 'statics/js/[name].[contenthash:5].js',
    path: path.resolve(config.output),
    publicPath: config.publicPath
  },

  mode: 'production',

  devtool: config.devtool,

  // plugins: [new CleanWebpackPlugin(), new ids.HashedModuleIdsPlugin()],

  // optimization: {
  //   minimizer: [
  //     new TerserJSPlugin({
  //       terserOptions: {
  //         // 去掉线上 console.log
  //         compress: {
  //           drop_console: true,
  //         }
  //       }
  //     }),
  //     // new OptimizeCSSAssetsPlugin({
  //     //   cssProcessPluginOptions: {
  //     //     preset: ['default', { discardComments: { removeAll: true } }]
  //     //   }
  //     // })
  //   ],
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'commons',
  //         chunks: 'initial',
  //         minChunks: 2
  //       },
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all',
  //         priority: -10
  //       },
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   },
  //   noEmitOnErrors: true
  // }
})
