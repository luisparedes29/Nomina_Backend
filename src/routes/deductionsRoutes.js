const express = require('express')
const router = express.Router()
const { getAllDeductionsName, getAll, createDeductionName, createDeductionData, editDeductionData, deleteOne } = require('./controllers/deductionsController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .post(
    "/create-deduction-name",
    validateToken,
    checkRole(["admin", "user"]),
    createDeductionName
  )
  .put(
    "/edit-deduction-data/:employeeId/:deductionDataId",
    validateToken,
    checkRole(["admin", "user"]),
    editDeductionData
  )
  .post(
    "/create-deduction-data/:employeeId/:deductionId",
    validateToken,
    checkRole(["admin", "user"]),
    createDeductionData
  )
  .get(
    "/all/:employeeId",
    validateToken,
    checkRole(["admin", "user"]),
    getAll
  )
  .get(
    "/all-deductions-name",
    validateToken,
    checkRole(["admin", "user"]),
    getAllDeductionsName
  )
  .delete(
    "/delete-deduction/:deductionDataId/:employeeId",
    validateToken,
    checkRole(["admin", "user"]),
    deleteOne
  );

module.exports = router
