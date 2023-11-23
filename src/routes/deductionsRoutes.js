const express = require("express");
const router = express.Router();
const {createDeduction, editDeduction, deleteDeduction, getDeductionsByEmployee} = require('./controllers/deductionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/find-deductions/user/:id',
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
    '/create-deduction',
    validateToken,
    checkRole("user"),
    createDeduction
  )
  .delete(
    '/delete-deduction/:id',
    validateToken,
    checkRole("user"),
    deleteDeduction
  )

module.exports = router;