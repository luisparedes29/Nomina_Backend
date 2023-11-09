const express = require('express');
const router = express.Router();
const { getAllDepartments, createDepartment, editDepartment, deleteDepartment } = require('./controllers/departmentController');

router
    .get('/all', getAllDepartments)
    .post('/create-department', createDepartment)
    .put('/edit-department/:id', editDepartment)
    .delete('/delete-department/:id', deleteDepartment);

module.exports = router;
