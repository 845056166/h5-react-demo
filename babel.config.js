// const webpackConfig = require('./build/webpack.config')

module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
    [
      'react-css-modules',
      {
        // context: webpackConfig.context,
        webpackHotModuleReloading: true,
        generateScopedName: '[local]--[hash:base64:5]',
        handleMissingStyleName: 'warn',
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-nested']
          }
        }
      }
    ],
    [
      'component',
      {
        libraryName: '@xhtech/mipha-react',
        style: false, // 样式整体引入
        camel2Dash: false
        // styleLibrary: {
        //   name: 'theme',
        //   base: false
        // }
      },
      // 'mipha-react'
    ]
  ]
}
