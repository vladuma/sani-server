const fs = require('fs').promises;
const db = require('./dynamo.js');
const path = getPath(); 

async function logToFS(data) {
    const filename = 'datalog.txt';
    const fullPath = `${path}/${filename}`; 

    await checkPath(fullPath);

    return fs.writeFile( fullPath, dataToLogString(data), {encoding: 'utf8', flag: 'a'} )
    .then( r => true)
    .catch( e => e);
}
function getPath() {
    const root = 'sani-server'
    const logFolder = 'logs';

    return `${root}/${logFolder}`;
}

async function checkPath(path) {
    try {
        await fs.access(path);
    } catch (error) {
        const dirsTocreate = path.split('/');
        dirsTocreate.pop();

        await fs.mkdir(dirsTocreate.join('/'), { recursive: true });
    }
}

function dataToLogString(data) {
    return `${new Date().toUTCString()} ===> ${data.split('&').map(splitParam).join('  |  ')} \n`;

    function splitParam(param) {
        if (param && param.length) {
            const splitted = param.split('=');
            if (splitted[1]) {
                return `${splitted[0]} : ${splitted[1]}`;
            } else {
                return `${splitted[0]} : NULL`;
            }
        }
        return 'MISSING PARAM'
    }
}

function logToDataBase(data) {
    return Promise.resolve().then( r => true)
    .catch( e => e);
}

module.exports =  {
    locally: logToFS,
    toDataBase: logToDataBase
};