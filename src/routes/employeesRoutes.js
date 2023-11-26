const express = require("express");
const router = express.Router();
const { createEmployee,
  allEmployeesOfCompany,
  getEmployeeById,
  editEmployee,
  deleteEmployee,} = require('./controllers/employeesController');
const {validateCreate, validateEdit} = require('./validators/employeeRoutes') 

 
router
  .post("/create-employee", validateCreate, createEmployee) 
  .get("/all", allEmployeesOfCompany)
  .get('/find-employee/:id', getEmployeeById)
  .put("/edit-employee/:id", validateEdit, editEmployee)
  .delete("/delete-employee/:id", deleteEmployee) 
module.exports = router;
