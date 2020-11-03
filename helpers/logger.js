const C = require('./../constants');
const fs = require('fs').promises;
const db = require('./dynamo');
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

async function logToDataBase(d) {
    const { dataToObject } = require('./serverHelper');
    const data = await dataToObject(d);
    
    console.log('data',data)
    if (data && data.icc) {
        try {
            const device = await db.getDevice(data.icc);
            console.log('device', device);
            if (!device) {
                return Promise.reject('Device not found');
            }

            const comands = device.comands;
            if (comands && comands.length) {
                // TODO: commands business logic
            }

            return db.updateDeviceLogs(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.reject('No data or missing icc');
}

module.exports =  {
    locally: logToFS,
    toDataBase: logToDataBase,
    getPath,
};