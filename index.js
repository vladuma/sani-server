const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
var textParser = bodyParser.text()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/postData', textParser, (req, res) => {
    res.send(`received data with headers: ${JSON.stringify(req.headers)}, url params: ${JSON.stringify(req.query)}, body: ${req.body}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})