const C = require('./../constants');
const { getPath } = require('./logger');

function getLogs(when) {
    return `${getPath()}/${C.LOG_FILE_NAME}`;
}

module.exports =  {
    getLogs,
}