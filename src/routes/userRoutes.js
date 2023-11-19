const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersOfCompany,
} = require('./controllers/userController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/all',
    validateToken,
    checkRole("admin"),
    getAllUsers,
   )
  .get(
    '/all-company/:id',
    validateToken,
    getAllUsersOfCompany
   )
  .post(
    '/signup/:id',
    validateToken,
    checkRole("admin"),
    registerUser
   )

  .post(
    '/login',
    loginUser
   )

module.exports = router
