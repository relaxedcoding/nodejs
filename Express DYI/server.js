const express = require('./express-dyi')

const app = express()

const sendResponse = (contentType, data, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.write(data)
  res.end()
}

app.static('public')

app.get('/hello', (req, res) => {
  sendResponse('text/plain', 'Hello You.', res)
})

app.get('/time', (req, res) => {
  sendResponse('text/html', Date(), res)
})

app.post('/time', (req, res) => {
  sendResponse('text/plain', 'Time updated.', res)
})

app.get('/about', (req, res) => {
  sendResponse('application/json', JSON.stringify({
    name: 'Wolf',
    age: 26,
    location: 'Austria'
  }), res)
})

app.start(3000)
