const express = require("express");
const router = express.Router();
const {createDeduction, deleteDeduction, getAll} = require('./controllers/deductionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/all',
    validateToken,
    getAll
  )
  .post(
    '/create-deduction',
    validateToken,
    checkRole("admin"),
    createDeduction
  )
  .delete(
    '/delete-deduction',
    validateToken,
    checkRole("admin"),
    deleteDeduction
  )

module.exports = router;