const express = require("express");
const router = express.Router();
const {createDeduction, editDeduction, deleteDeduction, getDeductionsByEmployee} = require('./controllers/deductionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/find-deductions/user/:companyId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    getDeductionsByEmployee,
  )
  .put(
    '/edit-deduction/:id',
    validateToken,
    checkRole(["admin", "user"]),
    editDeduction
   )
  .post(
    '/create-deduction/:companyId/:payrollId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    createDeduction
  )
  .delete(
    '/delete-deduction/:deductionId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    deleteDeduction
  )

module.exports = router;