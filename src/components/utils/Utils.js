import _ from 'lodash'

const Utils = {
   
    monthsArrayofArray : [],
    yearsArrayofArray : [],
    Months : [{"key": 0, "text": "January", "value": "01" },
    { "key": 1, "text": "February", "value": "02" },
    { "key": 2, "text": "March", "value": "03" },
    { "key": 3, "text": "April", "value": "04" },
    { "key": 4, "text": "May", "value": "05" },
    { "key": 5, "text": "June", "value": "06" },
    { "key": 6, "text": "July", "value": "07" },
    { "key": 7, "text": "August", "value": "08" },
    { "key": 8, "text": "September", "value": "09" },
    { "key": 9, "text": "October", "value": "10" },
    { "key": 10, "text": "November", "value": "11" },
    { "key": 11, "text": "December", "value": "12" }],

    Years : [{ "key": "2015", "text": "2015", "value": "2015" },
    { "key": "2016", "text": "2016", "value": "2016" },
    { "key": "2017", "text": "2017", "value": "2017" },
    { "key": "2018", "text": "2018", "value": "2018" }],

    WeekDayValues : ["S", "M", "T", "W", "T", "F", "S"],
    dayPerMonth : ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],


  
};

  Utils.generateCalendarData = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth();
        let lastDayOfTheMonth = Utils.dayPerMonth[month];
        if (month === 1) {
            if (((year % 100 !== 0) && (year % 4 === 0)) || (year % 400 === 0)) {
                lastDayOfTheMonth = 29;
            } else {
                lastDayOfTheMonth = 28;
            }
        }
        let dateValues = [];
        let dayValue = { value: 1 };
        let firstDayOfMonth = (new Date(parseInt(month, 10) + 1 + ' 1 ,' + year)).getDay();
        dateValues[0] = Utils.buildDateValuesArray(firstDayOfMonth, 6, dayValue);
        _.forEach([1, 2, 3, 4,5], (index) => {
            if (dayValue.value + 6 > lastDayOfTheMonth) {
                dateValues[index] = Utils.buildDateValuesArray(0, lastDayOfTheMonth-(dayValue.value), dayValue);
            } else {
                dateValues[index] = Utils.buildDateValuesArray(0, 6, dayValue);
            }
        })
        return dateValues;
    };

    Utils.buildDateValuesArray = (startIndex, endIndex, dayValue) => {
        let dateValuesArray = [];
        _.forEach([0, 1, 2, 3, 4, 5, 6], (index) => {
            if (index >= startIndex && index <= endIndex) {
                dateValuesArray.push(dayValue.value < 10 ? "0" + dayValue.value : dayValue.value.toString());
                dayValue.value++;
            } else {
                dateValuesArray.push("");
            }
        })
        return dateValuesArray;
    };


  Utils.Months.getMonthText = (index) => {
        return Utils.Months[index].text;
    }

   let month_iterator = [0, 1, 2, 3];
    _.forEach(month_iterator, (item, index) => {
        for (let counter = item * 4; counter < month_iterator[index + 1] * 4; counter++) {
            if (!Utils.monthsArrayofArray[item]) {
                Utils.monthsArrayofArray[item] = [];
            }
            Utils.monthsArrayofArray[item].push(Utils.Months[counter]);
        }
    });

    let year_iterator = [0];
    _.forEach(year_iterator, (item, index) => {
        for (let counter = item * 4; counter < 4; counter++) {
            if (!Utils.yearsArrayofArray[item]) {
                Utils.yearsArrayofArray[item] = [];
            }
            Utils.yearsArrayofArray[item].push(Utils.Years[counter]);
        }
    });

export default Utils;
