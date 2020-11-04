const axios = require('axios');

function getDevice(icc) {
    try {
        console.log(new Date().toUTCString() + ' get device icc: ', icc);
        return sendApiRequest('/getDeviceByIcc', { icc }).then(res => {
            console.log(new Date().toUTCString() + ' getDeviceByIcc res.data: ', res.data);
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
    console.log(new Date().toUTCString() + ' updateDeviceLogs request data: ', data);
    try {
        return sendApiRequest('/updateDeviceLogs', data).catch(error => {throw new Error(error)});
    } catch (error) {
        return Promise.reject(error);
    }
}

async function sendApiRequest(path, data) {
    const { getConfig } = require('./serverHelper');
    const config = JSON.parse(await getConfig());
    console.log(new Date().toUTCString() + ' AWS config:', config);
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