const moment = required('moment');

// function for time and name

function formatMess(name, text){
    return {
        name,
        time,
        text: moment().format('h:mm a')
    }
}

module.exports = formatMess;    