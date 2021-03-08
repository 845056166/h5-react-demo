const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackConfig = require('./webpack.config')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');
const WebpackDevServer = require('webpack-dev-server')
const { proxy } = require('../commonBuild')

const devServer =  {
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
  proxy: {
    '/auth/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false,
      onProxyRes(proxyRes, req, res) {
        proxy(proxyRes, req)
      }
    },
    '/h5-loan/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false,
      onProxyRes(proxyRes, req, res) {
        proxy(proxyRes, req)
      }
    },
    '/resources/*': {
      target: config.cdnPath,
      changeOrigin: true,
      secure: false
    },
    '/cdn/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false
    },
    '/client/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false
    },
    '/fp/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false
    },
    '/m/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false
    },
    '/lanaya-api/*': {
      target: config.proxyHost,
      changeOrigin: true,
      secure: false,
      onProxyRes(proxyRes, req, res) {
        proxy(proxyRes, req)
      }
    }
  }
};
const devConfig = merge(webpackConfig, {
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
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

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devServer.port;
  portfinder.getPort(function (err, port) {
    //
    // `port` is guaranteed to be a free port
    // in this scope.
    //
    if (err) {
      reject(err);
    } else {
      devServer.port = port;
      devConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: ['You application is running at http://localhost:'+ port],
          },
          clearConsole: true
        })
      );
      const app = new WebpackDevServer(webpack(devConfig), devServer)
      app.listen(port);
      resolve(devConfig);
    }
  });
})