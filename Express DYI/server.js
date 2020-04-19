const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {

  let filename = req.url

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.write(`You requested file: ${filename}`)

  res.end()
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}.`)
})