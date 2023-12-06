// Archivo para funciones con calculos de la nomina, recibo, etc

// Devuelve el Salario Base segun el priodo de pago
const getSalary = (monthlySalary, daysWorked) => {
   if (daysWorked === '15' || daysWorked === '16') {
      return monthlySalary / 2
   } else if (daysWorked === '7') {
      const dailySalary = monthlySalary / 30;
      return dailySalary * daysWorked;
   } else {
      return monthlySalary
   }
}

// Devuelve el total de percepciones
// Recibe el array de percepciones
const getTotalPercepctions = (perceptions) => {
   return perceptions.reduce((acc, perception) => acc + perception.amount, 0)
}

// Devuelve el total de deducciones
// Recibe el array de deducciones
const getTotalDeductions = (deductions) => {
   return deductions.reduce((acc, deduction) => acc + deduction.percentage, 0)
}

module.exports = {
   getSalary,
   getTotalPercepctions,
   getTotalDeductions
}