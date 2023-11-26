const express = require("express");
const router = express.Router();
const { generatePayroll, allPayrollsOfCompany, getOne } = require('./controllers/payrollControllers');
const {validateCreate} = require('./validators/payrollRoutes')
 
router
  .post("/generate-payroll/:companyId/:departmentId", validateCreate, generatePayroll) 
  .get("/all",  allPayrollsOfCompany)
  .get("/:_id", getOne)
module.exports = router;
