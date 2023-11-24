const express = require('express')
const router = express.Router()
const {
  generatePayroll,
  getOne,
} = require('./controllers/payrollControllers')

router
  .get('/generate-payroll/:companyId/:departmentId', generatePayroll)
  .get('/:_id', getOne)
module.exports = router
