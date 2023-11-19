const express = require('express')
const router = express.Router()
const {
  getAllDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
} = require('./controllers/departmentController')

router
  .get('/all/:id', getAllDepartments)
  .post('/create-department/:id', createDepartment)
  .put('/edit-department/:id', editDepartment)
  .delete('/delete-department/:companyId/:id', deleteDepartment)

module.exports = router
