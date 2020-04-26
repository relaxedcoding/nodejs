const http = require('http')

const port = 3000

let routes = {}

const sendResponse = (contentType, data, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.write(data)
  res.end()
}

const sendError = (errorCode, res) => {
  res.statusCode = errorCode
  res.setHeader('Content-Type', 'text/plain')
  res.write(`Error: ${errorCode}`)
  res.end()
}

const register = (route, method, requestHandler) => {

  if (routes[route] === undefined) {
    routes[route] = {}
  }

  routes[route][method] = requestHandler
}

register('/hello', 'GET', (req, res) => {
  sendResponse('text/plain', 'Hello You.', res)
})

register('/time', 'GET', (req, res) => {
  sendResponse('text/html', Date(), res)
})

register('/time', 'POST', (req, res) => {
  sendResponse('text/plain', 'Time updated.', res)
})

register('/about', 'GET', (req, res) => {
  sendResponse('application/json', JSON.stringify({
    name: 'Wolf',
    age: 26,
    location: 'Austria'
  }), res)
})

const server = http.createServer((req, res) => {

  let url = req.url
  let method = req.method

  let routeMethods = routes[url]
  if (routeMethods === undefined) {
    return sendError(404, res)
  }

  let requestHandler = routeMethods[method]
  if (requestHandler === undefined) {
    return sendError(404, res)
  }

  requestHandler(req, res)
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}.`)
})
