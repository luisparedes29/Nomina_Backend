const express = require('express')
const router = express.Router()
const {
  getAllDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
} = require('./controllers/departmentController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/all/:id',
    validateToken,
    checkRole(["admin", "user"]),
    getAllDepartments
  )
  .post(
    '/create-department/:id',
    validateToken,
    checkRole(["admin"]),
    createDepartment
  )
  .put(
    '/edit-department/:companyId/:id',
    validateToken,
    checkRole(["admin"]),
    editDepartment
  )
  .delete(
    '/delete-department/:companyId/:id',
    validateToken,
    checkRole(["admin"]),
    deleteDepartment
  )

module.exports = router
