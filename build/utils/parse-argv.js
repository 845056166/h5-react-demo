module.exports = function parse(argv) {
  const args = {}

  argv
    .filter(v => v.startsWith('--') && v.includes('='))
    .forEach(v => {
      const item = v.split('=')
      const key = item[0].replace('--', '')
      const value = item[1]

      args[key] = value
    })

  return args
}