const express = require('express')
const router = express.Router()
const {
  createPayroll,
  getAll,
  getOne,
} = require('./controllers/payrollControllers')

router
  .post('/create-payroll/:companyId/:departmentId', createPayroll)
  .get('/all', getAll)
  .get('/:_id', getOne)
module.exports = router
