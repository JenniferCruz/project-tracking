
function getInitialTimestamp() {
    // returns a timestamp corresponding to current date
    return new Date(Date.now()).getTime();
}

function getFinalTimestamp(daysFromToday) {
    // returns a timestamp corresponding to 15 days after current date
    var today = new Date(Date.now());
    var todayDay = today.getDate();
    var todayMonth = today.getMonth();

    var newDay = todayDay + daysFromToday + 1;
    var newMonth = todayMonth;

    if (todayDay > 15) {
        var dif = 30 - todayDay;
        newDay = 15 - dif;
        newMonth = todayMonth + 1;
    }

    return new Date(2017, newMonth, newDay).getTime();
}