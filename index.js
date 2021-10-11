const moment = require('moment');

(async () => {
    const inputDates = { '2020-01-20': 6, '2020-01-04': 12, '2020-01-05': 14, '2020-01-06': 2, '2020-01-07': 4 };
    const tempInputDates = inputDates;
    const getResult = await getOutputDays(tempInputDates);
    console.log(getResult);
    if (getResult.success) {
        console.log(getResult.message);
        console.log('Output dates: ', getResult.data);
    } else {
        console.log(getResult.message);
        console.log('Output dates: ', getResult.data);
    }
})();

function getOutputDays(inputDates = {}) {
    return new Promise((resolve, reject) => {
        const ipDates = inputDates;
        const daysObj = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
        const opDates = daysObj;
        let message = '';
        try {
            if (typeof (ipDates) !== 'object') {
                message = 'Given input is not a dictonary or object.'
                throw message;
            }

            if (!ipDates || Object.keys(ipDates).length == 0) {
                message = 'Given input object is empty dictonary.'
                throw message;
            }

            for (const item of Object.keys(ipDates)) {
                if (moment(item).format('ddd') == 'Invalid date') {
                    message = 'Given input object keys must have valid dates.'
                    throw message;
                } else if (item < '1970-01-01' || item > '2100-01-01') {
                    message = 'Given input object keys must range b/w 1970-01-01 AND 2100-01-01.'
                    throw message;
                } else if (typeof (ipDates[item]) !== 'number') {
                    message = 'Given input object values must have numbers format only.'
                    throw message;
                } else if (ipDates[item] < -1000000 || ipDates[item] > 1000000) {
                    message = 'Given input object values must range b/w -1000000 AND 1000000.'
                    throw message;
                } else if (daysObj.hasOwnProperty(moment(item).format('ddd'))) {
                    opDates[moment(item).format('ddd')] += ipDates[item];
                }
            }

            let id = 0;
            for (const item of Object.keys(opDates)) {
                if (opDates[item] == 0 && (item == 'Mon' || item == 'Sun')) {
                    message = 'Given input dates object must have Monday and Sunday.';
                    throw message;
                } else {
                    if (opDates[item] == 0) {
                        var prevNum = Object.values(opDates)[id - 1] ? Object.values(opDates)[id - 1] : 0;
                        var nextNum = Object.values(opDates)[id + 1] ? Object.values(opDates)[id + 1] : 0;
                        opDates[item] = Math.round((prevNum + nextNum) / 2);
                    }
                }
                id += 1;
            }
            console.log('Get final output dates isss', opDates);

            resolve({
                success: true,
                message: 'Get output days successful',
                data: opDates
            });
        } catch (error) {
            console.log('Error while calculating output days', error);
            resolve({
                success: false,
                message: message || 'Error while calculating output days',
                data: {}
            });
        }
    });
}