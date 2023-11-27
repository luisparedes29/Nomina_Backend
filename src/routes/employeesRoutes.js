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
    checkRole(["admin", "user"]),
    createEmployee
  )
  .get(
  '/all-company/:companyId',
    validateToken,
    checkRole(["admin", "user"]),
    allEmployeesOfCompany
  )
  .get(
  '/find-employee/:id',
    validateToken,
    checkRole(["admin", "user"]),
    getEmployeeById
  )
  .put(
  '/edit-employee/:id',
    validateToken,
    checkRole(["admin", "user"]),
    editEmployee
  )
  .delete(
  '/delete-employee/:id',
    validateToken,
    checkRole(["admin", "user"]),
    deleteEmployee
  )
module.exports = router
