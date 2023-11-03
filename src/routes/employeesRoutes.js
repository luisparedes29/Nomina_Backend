const express = require("express");
const router = express.Router();
const {createEmployee, allEmployees, deleteOne} = require('./controllers/employeesController');
 
router
  .post("/create-employee", createEmployee) 
  .get("/all", allEmployees)

  .delete("/delete/:_id", deleteOne)
module.exports = router;
