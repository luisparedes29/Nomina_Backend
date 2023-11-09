const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersOfCompany,
} = require('./controllers/userController')

router
  .get('/all', getAllUsers)
  .get('/all-company/:id', getAllUsersOfCompany)
  .post('/signup/:id', registerUser)

  .post('/login', loginUser)

module.exports = router
