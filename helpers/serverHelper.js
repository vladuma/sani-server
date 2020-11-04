const fs = require('fs').promises;
const C = require('./../constants');
const { getPath } = require('./logger');

function getLogs(when) {
    return `${getPath()}/${C.LOG_FILE_NAME}`;
}

function getConfig() {
    const configPath = 'sani-server/config/aws.txt';

    return fs.readFile(configPath);
}

function getDataMap() {
    const dataMapPath = 'sani-server/constants/uploadDataMap.txt';

    return fs.readFile(dataMapPath);
}

async function dataToObject(data) {
    const dataMap = JSON.parse(await getDataMap());
    const dataTypeMap = JSON.parse(await getDataTypesMap());
    const object = {};

    data.replace('\n', '').split('&').forEach(param => {
        const [key, value] = param.split('=');

        if (key && value) object[dataMap[key]] = adjustValueToType(key, value);
    });
    return object;

    function adjustValueToType(key, value) {
        switch (dataTypeMap[key]) {
            case 'String':
                return value + '';
            case 'Number':
                return value ? parseInt(value, 10) : 0;
            default:
                return value + '';
        }
    }
}

function getDataTypesMap() {
    const dataMapTypePath = 'sani-server/constants/uploadDataTypesMap.txt';

    return fs.readFile(dataMapTypePath);
}

function objectToString(data) {
    return Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
}

module.exports =  {
    getLogs,
    getConfig,
    dataToObject,
    objectToString,
}