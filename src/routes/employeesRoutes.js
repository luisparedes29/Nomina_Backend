const express = require('express')
const router = express.Router()
const {
  createEmployee,
  allEmployeesOfCompany,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} = require('./controllers/employeesController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .post(
  '/create-employee/:companyId/:departmentId',
    validateToken,
    checkRole("user"),
    createEmployee
  )
  .get(
  '/all-company/:companyId',
    validateToken,
    checkRole("user"),
    allEmployeesOfCompany
  )
  .get(
  '/find-employee/:id',
    validateToken,
    checkRole("user"),
    getEmployeeById
  )
  .put(
  '/edit-employee/:id',
    validateToken,
    checkRole("user"),
    editEmployee
  )
  .delete(
  '/delete-employee/:id',
    validateToken,
    checkRole("user"),
    deleteEmployee
  )
module.exports = router
