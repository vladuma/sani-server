const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/postData', (req, res) => {
    console.log(req.headers);
    res.send(`received data with headers: ${JSON.stringify(req.headers)}, url params: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})