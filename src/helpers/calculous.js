// const moment = require('moment')
const calcDailySalary = (baseSalary) => { 
    parseFloat(baseSalary)
    // const month = moment().month().toString();
    // const year = moment().year().toString();

    // const daysInMonth = moment(year-month, "YYYY-MM").daysInMonth();

    const result = baseSalary / 30;

    return parseFloat(result.toFixed(4))
}

const calcByPeriodicity = (periodicity, salaryBase) => { // Periodicity can be 7, 15 || 16, 30
    const dailySalary = calcDailySalary(salaryBase);
    const periodicityParsed = parseInt(periodicity)
    if(periodicityParsed == 15 || periodicityParsed == 16){
        const result = dailySalary * 15;
        console.log(result)
        return parseFloat(result.toFixed(4));
    }
    const result = dailySalary * periodicity;
    return parseFloat(result.toFixed(4));
}

const calcTotalPerception = (arr) => { // In case we've an arr as argument (amount)
    const total = arr.reduce((a,b )=> a+b,0)
    return parseFloat(total.toFixed(4));
}
const calcTotalDeductions = (arr) => { // In case we've an arr as argument (percent)
    const total = arr.reduce((a,b )=> a+b,0)
    return parseFloat(total.toFixed(4));
}
const bruteSalary = (TotalPerception, baseSalary) => { // Total perceptions is a float
    const total = baseSalary + TotalPerception;
    return parseFloat(total.toFixed(4));
}

const salaryWithDeductions = (TotalDeductions, bruteSalary) => { // Total deductions is a percent
    const rest = TotalDeductions * bruteSalary;
    const result = rest/100;
    return parseFloat(result.toFixed(4));
}       
module.exports = {
    calcDailySalary,
    calcByPeriodicity,
    calcTotalPerception,
    calcTotalDeductions,
    bruteSalary,
    salaryWithDeductions
}