const express = require("express");
const router = express.Router();
const {createDeduction, editDeduction, deleteDeduction, getDeductionsByEmployee} = require('./controllers/deductionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/find-deductions/user/:companyId/:employeeId',
    validateToken,
    checkRole("user"),
    getDeductionsByEmployee,
  )
  .put(
    '/edit-deduction/:id',
    validateToken,
    checkRole("user"),
    editDeduction
   )
  .post(
    '/create-deduction/:companyId/:payrollId/:employeeId',
    validateToken,
    checkRole("user"),
    createDeduction
  )
  .delete(
    '/delete-deduction/:deductionId/:employeeId',
    validateToken,
    checkRole("user"),
    deleteDeduction
  )

module.exports = router;