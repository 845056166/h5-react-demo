const path = require('path')

exports.getResolvePath = dirname => path.resolve(__dirname, `../../${dirname}`)
