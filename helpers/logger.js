const C = require('./../constants');
const fs = require('fs').promises;
const db = require('./dynamo.js');
const path = getPath(true); 

async function logToFS(data) {
    const filename = C.LOG_FILE_NAME;
    const fullPath = `${path}/${filename}`; 

    await checkPath(fullPath);

    return fs.writeFile( fullPath, dataToLogString(data), {encoding: 'utf8', flag: 'a'} )
    .then( r => true)
    .catch( e => e);
}
function getPath(withRoot) {
    const root = 'sani-server'
    const logFolder = 'logs';

    if (withRoot) {
        return `${root}/${logFolder}`;
    }
    return `${logFolder}`;
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
    toDataBase: logToDataBase,
    getPath,
};