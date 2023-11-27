const express = require("express");
const router = express.Router();
const { getPerceptionByEmployee, createPerception, editPerception, deleteOne } = require('./controllers/perceptionsController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .post(
    '/create-perception/:companyId/:payrollId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    createPerception,
  )
  .put(
    '/edit-perception/:perceptionId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    editPerception
  )
  .delete(
    '/delete-perception/:perceptionId/:employeeId',
    validateToken,
    checkRole(["admin", "user"]),
    deleteOne,
  )
  .get(
    '/find-perceptions/user/:id',
    validateToken,
    checkRole(["admin", "user"],
    getPerceptionByEmployee,
  )

module.exports = router