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
    checkRole("admin"),
    createPayroll
   )
  .get(
    '/all',
    validateToken,
    getAll
   )
  .get(
    '/:_id',
    validateToken,
    getOne
   )
module.exports = router
