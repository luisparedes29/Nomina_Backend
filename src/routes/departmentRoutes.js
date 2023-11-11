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
    '/all',
    validateToken,
    getAllDepartments
  )
  .post(
    '/create-department/:id',
    validateToken,
    checkRole("admin"),
    createDepartment
  )
  .put(
    '/edit-department/:id',
    validateToken,
    checkRole("admin"),
    editDepartment
  )
  .delete(
    '/delete-department/:id',
    validateToken,
    checkRole("admin"),
    deleteDepartment
  )

module.exports = router
