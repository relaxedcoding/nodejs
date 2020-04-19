const fs = require('fs')
const http = require('http')
const path = require('path')

const port = 3000

const staticDir = 'public'

const contentTypes = {
  'html': 'text/html',
  'jpg': 'image/jpeg',
  'ico': 'image/x-icon',
  'js': 'text/javascript',
  'css': 'text/css'
}

const getFilename = (req) => {
  let filename = req.url

  if (filename === '/') {
    filename = 'index.html'
  }

  return path.join(__dirname, staticDir, filename)
}

const getFileExtension = (filename) => {
  let parts = filename.split('.')
  return parts[parts.length - 1]
}

const getContentType = (fileExtension) => {
  return contentTypes[fileExtension] === undefined ? null : contentTypes[fileExtension]
}

const sendFile = (filename, contentType, res) => {
  let fileContent = fs.readFileSync(filename)

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.write(fileContent)

  res.end()
}

const sendError = (errorCode, res) => {
  res.statusCode = errorCode
  res.setHeader('Content-Type', 'text/plain')
  res.write(`Error: ${errorCode}`)
  res.end()
}

const server = http.createServer((req, res) => {

  let filename = getFilename(req)
  let fileExtension = getFileExtension(filename)
  let contentType = getContentType(fileExtension)

  if (contentType === null) {
    return sendError(400, res)
  }

  if (!fs.existsSync(filename)) {
    sendError(404, res)
    return
  }

  sendFile(filename, contentType, res)
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}.`)
})