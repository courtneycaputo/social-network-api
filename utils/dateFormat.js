const addDateSuffix = (date) => {
    let dateString = date.toString();


    const lastChar = dateString.charAt(dateString.length -1);
    if(lastChar === '1' && dateString != '11') {
        dateString = `${dateString}st`
    } 
    else if (lastChar === '2' && dateString != '11') {
        dateString = `${dateString}nd`
    }
    else if (lastChar === '3' && dateString != '13') {
        dateString = `${dateString}rd`
    }
    else {
        dateString = `${dateString}th`
    }
    return dateString;
}

module.exports = (timestamp, {monthLength = 'short', dateSuffix = true} = {}) => {

}

// ---------------- at 25 minutes of video -----------------------