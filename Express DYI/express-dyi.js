const http = require('http')

const expressStatic = require('./express-static')
const expressDynamic = require('./express-dynamic')

const sendError = (errorCode, res) => {
  res.statusCode = errorCode
  res.setHeader('Content-Type', 'text/plain')
  res.write(`Error: ${errorCode}`)
  res.end()
}

const create = () => {

  const server = http.createServer((req, res) => {
    let success = expressStatic.sendStatic(req, res)
    if (!success) {
      success = expressDynamic.sendDynamic(req, res)
      if (!success) {
        return sendError(404, res)
      }
    }
  })

  const static = (dir) => {
    expressStatic.setStaticDir(dir)
  }

  const get = (route, requestHandler) => {
    expressDynamic.register(route, 'GET', requestHandler)
  }

  const post = (route, requestHandler) => {
    expressDynamic.register(route, 'POST', requestHandler)
  }

  const start = (port) => {
    server.listen(port, () => {
      console.log(`Server listening on port: ${port}`)
    })
  }

  return {
    static,
    get,
    post,
    start
  }
}

module.exports = create