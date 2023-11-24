const express = require('express')
const router = express.Router()
const {
  generatePayroll,
  getAll,
  getOne,
} = require('./controllers/payrollControllers')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/generate-payroll/:departmentId',
    validateToken,
    checkRole("user"),
    generatePayroll
  )
  .get(
    '/:_id',
    validateToken,
    checkRole("user"),
    getOne
  )
module.exports = router
