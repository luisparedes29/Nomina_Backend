const express = require('express')
const router = express.Router()
const { generatePayroll, getOne, deleteEmployee, deletePayroll, updateStatePayroll, allPayrollsOfCompany } = require('./controllers/payrollControllers')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .post(
    '/generate-payroll/:companyId',
    validateToken,
    checkRole(['admin', 'user']),
    generatePayroll
  )
  .get('/all-payrolls/:companyId', validateToken, checkRole(['admin', 'user']), allPayrollsOfCompany)
  .get('/:id/:companyId', validateToken, checkRole(['admin', 'user']), getOne)
  .delete('/delete-employee-payroll/:payrollId/:employeeId', validateToken, checkRole(['admin', 'user']), deleteEmployee)
  .delete('/delete-payroll/:payrollId/:companyId', validateToken, checkRole(['admin', 'user']), deletePayroll)
  .put('/update-state-payroll/:payrollId/:companyId', validateToken, checkRole(['admin', 'user']), updateStatePayroll)
module.exports = router
