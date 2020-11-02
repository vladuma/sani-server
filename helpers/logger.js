const fs = require('fs').promises;

function logToFS(data) {
    console.log(data);
    try {
        return fs.writeFile( 'logs/datalog.txt', dataToLogString(data), {encoding: 'utf8', flag: 'a'} );
    } catch (error) {
        console.error(error)
        return error;
    }
}

function dataToLogString(data) {
    return `${new Date().toUTCString()} ===> ${data.split('&').map(splitParam).join('  |  ')}`;

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
    return Promise.resolve();
}

module.exports =  {
    locally: logToFS,
    toDataBase: logToDataBase
};