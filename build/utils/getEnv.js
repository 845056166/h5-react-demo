const parse = require('./parse-argv')

module.exports = () => {
  const args = parse(process.argv.slice(2))
  return args.NODE_ENV
}