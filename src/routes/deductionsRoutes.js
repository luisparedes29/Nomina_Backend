const express = require("express");
const router = express.Router();
const {createDeduction, deleteDeduction, getAll, getDeductionsByEmployee} = require('./controllers/deductionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/:id',
    validateToken,
    checkRole("user"),
    getDeductionsByEmployee,
  )
  .get(
    '/all',
    validateToken,
    checkRole("user"),
    getAll
  )
  .post(
    '/create-deduction',
    validateToken,
    checkRole("user"),
    createDeduction
  )
  .delete(
    '/delete-deduction',
    validateToken,
    checkRole("user"),
    deleteDeduction
  )

module.exports = router;