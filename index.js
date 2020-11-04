const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); 
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const C = require('./constants.js');
const helper = require('./helpers/serverHelper.js');
const log = require('./helpers/logger.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/postData', async (req, res) => {
    try {
        const data = req.body;

        if (!data) throw new Error(new Date().toUTCString() + ' No data on request. Request:', JSON.stringify(data));

        const loggedLocally = await log.locally(data);
        const loggedToDB = await log.toDataBase(data);

        if (!loggedLocally || !loggedToDB) {
            throw new Error(new Date().toUTCString() + ' Error logging data:', JSON.stringify({loggedLocally, loggedToDB}));
        }
        
        res.sendStatus(C.SUCCESS_STATUS);
    } catch (error) {
        console.error(new Date().toUTCString() + ' Error posting data', error);
        res.status(C.ERROR_STATUS).send(JSON.stringify(error));
    }
})
app.get('/getLogs', async (req, res) => {
    try {
        const when = req.params.when;
        
        res.sendFile(helper.getLogs(when ? when : 'today'), { root: path.join(__dirname)});
    } catch (error) {
        console.log(new Date().toUTCString() + ' Error getting logs', error);
        res.status(C.ERROR_STATUS).send(JSON.stringify(error));
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})