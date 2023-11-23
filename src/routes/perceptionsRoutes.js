const express = require("express");
const router = express.Router();
const { getPerceptionByEmployee, createPerception, editPerception, deleteOne } = require('./controllers/perceptionsController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
.post(
  '/create-perception/:companyId/:payrollId/:employeeId',
  validateToken,
  checkRole("user"),
  createPerception 
 )
 .get(
   '/find-perceptions/user/:id',
   validateToken,
   checkRole("user"),
   getPerceptionByEmployee,
 )
 .put(
   '/edit-perception/:perceptionId/:employeeId',
   validateToken,
   checkRole("user"),
   editPerception
  )
.delete(
  '/delete-perception/:perceptionId/:employeeId',
  validateToken,
  checkRole("user"),
  deleteOne
 )

module.exports = router