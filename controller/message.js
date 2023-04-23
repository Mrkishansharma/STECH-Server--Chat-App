
const moment = require('moment');

const formateMsg = (username, msg) =>{
    // console.log();
    return {
        username,
        msg,
        time: moment().format('h:mm a')
    }
}

module.exports = {
    formateMsg
}