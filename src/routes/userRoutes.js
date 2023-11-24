const express = require('express');
const router = express.Router();
const { registerUser, getAllUsersOfCompany, loginUser, editUser, deleteUser } = require('./controllers/userController');

router
    .get('/all-company/:id', getAllUsersOfCompany)
    .post('/signup/:id', registerUser)
    .post('/login/', loginUser)
    .put('/edit/:id', editUser)
    .delete('/delete/:id', deleteUser)

module.exports = router;
