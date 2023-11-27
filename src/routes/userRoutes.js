const express = require('express')
const router = express.Router()
const {
  registerUser,
  getAllUsersOfCompany,
  loginUser,
  editUser,
  deleteUser,
  getUserById
} = require('./controllers/userController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .get(
    '/all-company/:id',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    getAllUsersOfCompany
  )
  .get('/:id', validateToken, checkRole(['admin', 'superAdmin']), getUserById)
  .post(
    '/signup/:id',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    registerUser
  )
  .post('/login/', loginUser)
  .put('/edit/:id', validateToken, checkRole(['admin', 'superAdmin']), editUser)
  .delete(
    '/delete/:id/:employeeId',
    validateToken,
    checkRole(['admin', 'superAdmin']),
    deleteUser
  )

module.exports = router
