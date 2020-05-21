const express = require('express')
const path = require('path')

var app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/hello', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Hello You.')
})

app.get('/time', (req, res) => {
  res.send(Date())
})

app.post('/time', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Time updated.')
})

app.get('/about', (req, res) => {
  res.send({
    name: 'Wolf', 
    age: 26,
    location: 'Austria',
  })
})

app.listen(3000)