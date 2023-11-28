const express = require("express");
const router = express.Router();
const {
  getAll,
  createPerceptionName,
  deleteOne,
  createPerceptionData,
} = require("./controllers/perceptionsController");
const { validateToken, checkRole } = require("./controllers/jwtAuth");

router
  .post(
    "/create-perception-name",
    validateToken,
    checkRole(["admin", "user"]),
    createPerceptionName
  )
  .post(
    "/create-perception-data/:employeeId/:perceptionId",
    validateToken,
    checkRole(["admin", "user"]),
    createPerceptionData
  )
  .get(
    "/all/:employeeId",
    validateToken,
    checkRole(["admin", "user"]),
    getAll
  )
  .delete(
    "/delete-perception/:perceptionDataId",
    validateToken,
    checkRole(["admin", "user"]),
    deleteOne
  );

module.exports = router;
