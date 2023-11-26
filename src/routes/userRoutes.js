const express = require('express')
const router = express.Router()
const {
  registerUser,
  getAllUsersOfCompany,
  loginUser,
  editUser,
  deleteUser,
} = require('./controllers/userController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')
const { signup, login, validateEdit } = require('./validators/userRoutes')

router
  .get(
    '/all-company/:id',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    getAllUsersOfCompany
  )
  .post(
    '/signup/:id',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    signup,
    registerUser
  )
  .post('/login/', login, loginUser)
  .put('/edit/:id', validateToken, checkRole(['admin', 'superAdmin']), validateEdit, editUser)
  .delete(
    '/delete/:id',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    deleteUser
  )

module.exports = router
