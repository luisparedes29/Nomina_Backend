const express = require('express')
const router = express.Router()
const {
  createPayroll,
  getAll,
  getOne,
} = require('./controllers/payrollControllers')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .post(
    '/create-payroll/:companyId/:departmentId',
    validateToken,
    checkRole("user"),
    createPayroll
   )
  .get(
    '/all',
    validateToken,
    checkRole("user"),
    getAll
   )
  .get(
    '/:_id',
    validateToken,
    checkRole("user"),
    getOne
   )
module.exports = router
