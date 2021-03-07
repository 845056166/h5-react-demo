const chalk = require('chalk')
const semver = require('semver')

module.exports = wanted => {
  const currentNodeVersion = process.version
  if (!semver.satisfies(currentNodeVersion, wanted)) {
    console.error(
      chalk.red(
        'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        'The project requires Node ' +
        wanted +
        '. \n' +
        'Please update your version of Node.'
      )
    )
    process.exit(1)
  }
}
