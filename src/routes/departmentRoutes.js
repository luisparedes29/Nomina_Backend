const express = require('express')
const router = express.Router()
const {
  getAllDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
} = require('./controllers/departmentController')
const {validateCreate, validateEdit } = require('./validators/departmentRoutes')

router
.get(
  '/all/:id',
  validateToken,
  checkRole(['admin', 'user']),
  getAllDepartments
)
.post(
  '/create-department/:id',
  validateToken,
  checkRole(['admin']),
  validateCreate,
  createDepartment
)
.put(
  '/edit-department/:companyId/:id',
  validateToken,
  checkRole(['admin']),
  validateEdit
  editDepartment
)
.delete(
  '/delete-department/:companyId/:id',
  validateToken,
  checkRole(['admin']),
  deleteDepartment
) 

module.exports = router
