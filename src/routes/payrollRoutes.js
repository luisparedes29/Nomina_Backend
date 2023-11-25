const express = require('express')
const router = express.Router()
const {
  generatePayroll,
  getOne,
} = require('./controllers/payrollControllers')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/generate-payroll/:companyId/:departmentId',
    validateToken,
    checkRole(["admin", "user"]),
    generatePayroll
  )
  .get(
    '/:_id',
    validateToken,
    checkRole(["admin", "user"]),
    getOne
  )
module.exports = router
