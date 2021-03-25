const webpackConfig = require('./build/webpack.config')
const { interpolateName } = require('loader-utils');
const path = require('path')

// function interpolateName(loaderContext, name, options) {
//   let filename;

//   const hasQuery =
//     loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1;

//   if (typeof name === 'function') {
//     filename = name(
//       loaderContext.resourcePath,
//       hasQuery ? loaderContext.resourceQuery : undefined
//     );
//   } else {
//     filename = name || '[hash].[ext]';
//   }

//   const context = options.context;
//   const content = options.content;
//   const regExp = options.regExp;

//   let ext = 'bin';
//   let basename = 'file';
//   let directory = '';
//   let folder = '';
//   let query = '';

//   if (loaderContext.resourcePath) {
//     const parsed = path.parse(loaderContext.resourcePath);
//     let resourcePath = loaderContext.resourcePath;

//     if (parsed.ext) {
//       ext = parsed.ext.substr(1);
//     }

//     if (parsed.dir) {
//       basename = parsed.name;
//       resourcePath = parsed.dir + path.sep;
//     }

//     if (typeof context !== 'undefined') {
//       directory = path
//         .relative(context, resourcePath + '_')
//         .replace(/\\/g, '/')
//         .replace(/\.\.(\/)?/g, '_$1');
//       directory = directory.substr(0, directory.length - 1);
//     } else {
//       directory = resourcePath.replace(/\\/g, '/').replace(/\.\.(\/)?/g, '_$1');
//     }

//     if (directory.length === 1) {
//       directory = '';
//     } else if (directory.length > 1) {
//       folder = path.basename(directory);
//     }
//   }

//   if (loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1) {
//     query = loaderContext.resourceQuery;

//     const hashIdx = query.indexOf('#');

//     if (hashIdx >= 0) {
//       query = query.substr(0, hashIdx);
//     }
//   }

//   let url = filename;

//   if (content) {
//     // Match hash template
//     url = url
//       // `hash` and `contenthash` are same in `loader-utils` context
//       // let's keep `hash` for backward compatibility
//       .replace(
//         /\[(?:([^:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
//         (all, hashType, digestType, maxLength) =>
//           getHashDigest(content, hashType, digestType, parseInt(maxLength, 10))
//       )
//       .replace(/\[emoji(?::(\d+))?\]/gi, (all, length) =>
//         encodeStringToEmoji(content, parseInt(length, 10))
//       );
//   }

//   url = url
//     .replace(/\[ext\]/gi, () => ext)
//     .replace(/\[name\]/gi, () => basename)
//     .replace(/\[path\]/gi, () => directory)
//     .replace(/\[folder\]/gi, () => folder)
//     .replace(/\[query\]/gi, () => query);

//   if (regExp && loaderContext.resourcePath) {
//     const match = loaderContext.resourcePath.match(new RegExp(regExp));

//     match &&
//       match.forEach((matched, i) => {
//         url = url.replace(new RegExp('\\[' + i + '\\]', 'ig'), matched);
//       });
//   }

//   if (
//     typeof loaderContext.options === 'object' &&
//     typeof loaderContext.options.customInterpolateName === 'function'
//   ) {
//     url = loaderContext.options.customInterpolateName.call(
//       loaderContext,
//       url,
//       name,
//       options
//     );
//   }

//   return url;
// }

function generateScopedName(pattern) {
  const context = process.cwd();
  return function generate(localName, filepath) {
    const name = pattern.replace(/\[local\]/gi, localName);
    const loaderContext = {
      resourcePath: filepath,
    };

    const loaderOptions = {
      content: `${path.relative(context, filepath).replace(/\\/g, '/')}\u0000${localName}`.replace(/src\//g, ''),
      context,
    };

    const genericName = interpolateName(loaderContext, name, loaderOptions);
    console.log(genericName);
    console.log('babel-react');
    
    return genericName
      .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
      .replace(/^((-?[0-9])|--)/, '_$1');
  };
}


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
        context: webpackConfig.context,
        webpackHotModuleReloading: true,
        generateScopedName: generateScopedName('[local]-[hash:base64:5]'),
        exclude: 'node_modules',
        handleMissingStyleName: 'warn',
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            // plugins: ['postcss-nested']
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
