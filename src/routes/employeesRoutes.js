const express = require('express')
const router = express.Router()
const {
  createEmployee,
  allEmployeesOfCompany,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} = require('./controllers/employeesController')

router
  .post('/create-employee/:companyId/:departmentId', createEmployee)
  .get('/all-company/:companyId', allEmployeesOfCompany)
  .get('/find-employee/:id', getEmployeeById)
  .put('/edit-employee/:id', editEmployee)
  .delete('/delete-employee/:id', deleteEmployee)
module.exports = router
