const express = require('express');
const router = express.Router();
const { registerUser, loginUser, editUser, deleteUser } = require('./controllers/userController');

router
    .post('/signup/', registerUser)
    .put('/edit/:id', editUser)
    .delete('/delete/:id', deleteUser)

module.exports = router;
