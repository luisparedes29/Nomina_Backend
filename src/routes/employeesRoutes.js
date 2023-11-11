const express = require('express')
const router = express.Router()
const {
  createEmployee,
  allEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} = require('./controllers/employeesController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .post(
    '/create-employee/:companyId/:departmentId',
    validateToken,
    createEmployee
   )
  .get(
    '/all',
    validateToken,
    allEmployees
   )
  .get(
    '/find-employee/:id',
    validateToken,
    getEmployeeById
   )
  .put(
    '/edit-employee/:id',
    validateToken,
    checkRole("admin"),
    editEmployee
   )
  .delete(
    '/delete-employee/:id',
    validateToken,
    checkRole("admin"),
    deleteEmployee
   )
module.exports = router
