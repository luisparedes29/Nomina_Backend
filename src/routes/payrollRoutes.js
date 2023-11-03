const express = require("express");
const router = express.Router();
const { createPayroll, getAll } = require('./controllers/payrollControllers');
 
router
  .post("/create-payroll",  createPayroll) 
  .get("/all",  getAll)
module.exports = router;
