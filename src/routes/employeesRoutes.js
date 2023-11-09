const express = require("express");
const router = express.Router();
const {createEmployee, allEmployees, getEmployeeById, editEmployee, deleteEmployee} = require('./controllers/employeesController');
 
router
  .post("/create-employee", createEmployee) 
  .get("/all", allEmployees)
  .get('/find-employee/:id', getEmployeeById)
  .put("/edit-employee/:id", editEmployee)
  .delete("/delete-employee/:id", deleteEmployee)
module.exports = router;
