// DE MOMENTO LOS VALORES ESTÁN SIENDO TRUNCADOS CON 4 DECIMALES.
// MENOS DONDE SE USA LA FUNCIÓN ROUND.

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
    parseFloat(salaryBase)
    const dailySalary = calcDailySalary(salaryBase);
    const periodicityParsed = parseInt(periodicity)
    if(periodicityParsed == 15 || periodicityParsed == 16){
        const result = dailySalary * 15;
        return parseFloat(result.toFixed(4));
    }
    const result = dailySalary * periodicity;
    return Math.round(parseFloat(result.toFixed(4))); // In this case is rounded to avoid things like: salaryBase = 2500, we select a 30 days periodicity and the result is 2499.9
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
    parseFloat(baseSalary)
    parseFloat(TotalPerception)
    const total = baseSalary + TotalPerception;
    return parseFloat(total.toFixed(4));
}
const salaryWithDeductions = (TotalDeductions, bruteSalary) => { // Total deductions is a percent (float in any case)
    parseFloat(bruteSalary)
    parseFloat(TotalDeductions)
    const rest = TotalDeductions * bruteSalary;
    const percentToNum = rest/100;
    const result = bruteSalary - percentToNum
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