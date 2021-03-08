const ora = require('ora')
const webpack = require('webpack')
const chalk = require('chalk')
const webpackConfig = require('./webpack.prod')
const { getResolvePath } = require('./utils')
const logger = require('./utils/logger')
const checkNodeVersion = require('./utils/check-version')

const version = require('../package').engines.node
const output = getResolvePath(config.output)

logger.info(`Node: ${chalk.bold(process.version)}`)
logger.info(`Environment: ${chalk.bold(config.env)}`)
logger.info(`Output: ${chalk.bold(output)}`)

checkNodeVersion(version)

const startTime = Date.now()
const spinner = ora(`Building for ${config.env}...`)
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()

  if (err) {
    logger.error('Webpack compiler encountered a fatal error.', err)
    throw err
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  logger.success(`Compiler finished successfully! See ${output}.`)
  logger.info(`Done in ${(Date.now() - startTime) / 1000}s.`)
})
