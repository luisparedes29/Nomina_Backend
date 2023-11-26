const express = require("express");
const router = express.Router();
const { createPayroll, getAll, getOne } = require('./controllers/payrollControllers');
const {validateCreate} = require('./validators/payrollRoutes')
 
router
  .post("/generate-payroll/:companyId/:departmentId", validateCreate, createPayroll) 
  .get("/all",  getAll)
  .get("/:_id", getOne)
module.exports = router;
