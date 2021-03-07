const parse = require('./parse-argv')

module.exports = () => {
  const args = parse(process.argv.slice(3))
  console.log(process.argv);
  console.log(args);
  
  return args.NODE_ENV
}