const http = require('http')

let routes = {}

const register = (route, method, requestHandler) => {

  if (routes[route] === undefined) {
    routes[route] = {}
  }

  routes[route][method] = requestHandler
}

const sendDynamic = (req, res) => {

  let url = req.url
  let method = req.method

  let routeMethods = routes[url]
  if (routeMethods === undefined) {
    return false
  }

  let requestHandler = routeMethods[method]
  if (requestHandler === undefined) {
    return false
  }

  requestHandler(req, res)
  return true
}

module.exports = {
  register,
  sendDynamic
}