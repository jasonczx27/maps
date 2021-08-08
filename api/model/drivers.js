const https = require("https")
const utils = require("../controller/utils")


async function getDrivers(n) {
    const dNumbers = utils.isvalidNumber(n) ? `&count=${n}` : ""
    try {

        return new Promise((resolve, reject) => {
            https.get(`https://qa-interview-test.splytech.dev/api/drivers?latitude=1&longitude=1${dNumbers}`, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    resolve(data)
                });

            });
        })
    }
    catch (e) {
        console.log("Error")
        console.log(e)
        return []
    }
}
module.exports = {
    getDrivers
}
