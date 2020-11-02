const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const C = require('./constants.js');
const log = require('./helpers/logger.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/postData', async (req, res) => {
    console.log(JSON.stringify(req.body));
    // res.send(`received data with headers: ${JSON.stringify(req.headers)}, url params: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}, body is typeof ${typeof req.body}`);
    try {
        const data = req.body;
        
        await log.locally(data);
        await log.toDataBase(data);

        res.sendStatus(C.SUCCESS_STATUS);
    } catch (error) {
        res.sendStatus(C.ERROR_STATUS);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})