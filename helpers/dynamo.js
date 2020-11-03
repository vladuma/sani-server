const axios = require('axios');

function getDevice(icc) {
    try {
        console.log(icc);
        return sendApiRequest('/getDeviceByIcc', { icc }).then(res => {
            console.log('getDeviceByIcc', res.data);
            return res.data.data.body.items.length > 0 ? res.data.data.body.items[0] : null
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
async function updateDeviceLogs(params) {
    const data = {
        icc: params.icc,
        data: params
    };
    console.log('updateDeviceLogs', data);
    try {
        return sendApiRequest('/updateDeviceLogs', data).catch(error => {throw new Error(error)});
    } catch (error) {
        return Promise.reject(error);
    }
}

async function sendApiRequest(path, data) {
    const { getConfig } = require('./serverHelper');
    const config = JSON.parse(await getConfig());
    console.log('config', config);
    const url = config.AWS_API_ENDPOINT + path;
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': config.AWS_API_KEY
        }
    }
    return axios.post(url, data, options).catch(error => {throw new Error(error)});
}

module.exports = {
    getDevice,
    updateDeviceLogs,
}