const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require("./controllers/userController");
const {signup} = require("./validators/userRoutes")

router .get('/all-company/:id', getAllUsersOfCompany)
.post('/signup/:id', signup, registerUser)
.post('/login/', loginUser)
.put('/edit/:id', editUser)
.delete('/delete/:id', deleteUser)

module.exports = router;
