const express = require('express')
const router = express.Router()
const {
  generatePayroll,
  getAll,
  getOne,
} = require('./controllers/payrollControllers')

router
  .get('/generate-payroll/:departmentId', generatePayroll)
  .get('/:_id', getOne)
module.exports = router
