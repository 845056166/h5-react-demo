const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { commonBuild } = require('../commonBuild')
const config  = commonBuild('h5-demo')
const DEV_ENV = process.env.NODE_ENV === 'development'

const { plugins } = require('../postcss.config')

global.config = config
module.exports = {
  entry: './index.tsx',

  output: {
    filename: DEV_ENV ? '[name].js' : 'js/[name].[contenthash:5].js',
    path: path.resolve(__dirname, `../${config.output}`),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          DEV_ENV
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: 'css'
                }
              },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]-[hash:base64:5]',
              }
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [/[\\/]node_modules[\\/].*mipha/],
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: DEV_ENV
            ? 'imgs/[name].[ext]'
            : 'statics/imgs/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'statics/fonts/[name].[hash:5].[ext]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    symlinks: false
  },

  context: path.resolve(__dirname, '../src'),

  stats: 'errors-only',

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      cdnPath: config.cdnPath
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.prefix': JSON.stringify(config.proxyHost),
      'process.env.host': JSON.stringify(config.host || config.proxyHost),
      'ROOT_VALUE': JSON.stringify(
        // plugins['postcss-px-to-viewport'].viewportWidth
      )
    }),
    new MiniCssExtractPlugin({
      filename: 'statics/css/[name].[contenthash:5].css',
      chunkFilename: 'statics/css/[id].[contenthash:5].css',
      esModule: false
    })
  ]
}
