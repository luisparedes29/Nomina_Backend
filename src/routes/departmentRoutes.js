const express = require('express');
const router = express.Router();
const { getAllDepartments, createDepartment, editDepartment, deleteDepartment } = require('./controllers/departmentController');
const {validateCreate, validateEdit } = require('./validators/departmentRoutes')

router
.get('/all', getAllDepartments)
.post('/create-department', validateCreate, createDepartment)
.put('/edit-department/:id', validateEdit, editDepartment)
.delete('/delete-department/:id',  deleteDepartment);

module.exports = router
