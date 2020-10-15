const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/postData', (req, res) => {
    // console.log(req.body);
    res.send(`received data with headers: ${JSON.stringify(req.headers)}, url params: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}, body is typeof ${typeof req.body}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})