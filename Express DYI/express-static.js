const fs = require('fs')
const http = require('http')
const path = require('path')

let staticDir 

const setStaticDir = (dir) => {
  staticDir = dir
}

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

const sendStatic = (req, res) => {

  let filename = getFilename(req)
  let fileExtension = getFileExtension(filename)
  let contentType = getContentType(fileExtension)

  if (!fs.existsSync(filename)) {
    return false
  }

  sendFile(filename, contentType, res)
  return true
}

module.exports = {
  setStaticDir,
  sendStatic
}