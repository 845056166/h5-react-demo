const ProxyHost = 'http://test2.com';
exports.ProxyHost = ProxyHost
const commonPort = 3005
const parse = function parse(argv) {
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

const getEnv = () => {
  const args = parse(process.argv.slice(2))
  return args.NODE_ENV
}

exports.getEnv = getEnv

exports.proxy = function proxy(proxyRes, req) {
  const reqOrigin = req.headers.host
  let cookies = proxyRes.headers['set-cookie']
  let cookieRegex = /Path=\/XXX\//i
  // 修改cookie Path
  if (cookies) {
    let newCookie = cookies.map(cookie => {
      if (cookieRegex.test(cookie)) {
        return cookie.replace(cookieRegex, 'Path=/')
      }
      return cookie
    })
    // 修改cookie path
    delete proxyRes.headers['set-cookie']
    proxyRes.headers['set-cookie'] = newCookie
  }

  if (proxyRes.headers.location) {
    proxyRes.headers.location = proxyRes.headers.location.replace(
      config.proxyHost,
      `http://${reqOrigin}`
    )
  }
}
// 各个环境的cdn配置
const _cdnConfig = {
  test: '//test.cdn.cn',
  prod: '//prod.cdn.cn',
  uat: '//uat.cdn.cn',
  production: '//prod.cdn.cn',
  development: '//test.cdn.cn',
  dev: '//test.cdn.cn'
}
const checkEnv = () => {
  const env = getEnv()
  let lang = 'prod'
  if (env.includes('dev')) lang = 'development'
  if (env.includes('test')) lang = 'test'
  if (env.includes('uat')) lang = 'uat'
  return lang
}

/**
 * 
 * @param {开发环境端口} port 
 * @param {静态文件地址} cdnPath 
 * @param {生成文件目录} output
 * @param {接口前缀} prefix 用于开发环境登录跳转地址
 * @param {sourceMap} devtool 
 * @param {资源前缀} publicPath
  */
function commonBuild(projectName = 'demo', publicPath, proxyHost = ProxyHost, output = 'output') {
  const env = checkEnv()
  const config = Object.create(null)
  config.cdnPath = _cdnConfig[env]
  config.output = output
  config.proxyHost = proxyHost
  config.devtool = ['development', 'dev'].includes(env)
  // 如果是dev环境并且传过来publicPath就取publicPath
  config.publicPath = (config.devtool && publicPath) ? publicPath : `${config.cdnPath}/${projectName}/`
  config.prefix = proxyHost
  config.env = getEnv()
  config.port = commonPort
  return config
}
exports.commonBuild = commonBuild
