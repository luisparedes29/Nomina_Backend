const express = require('express')
const router = express.Router()
const {
  createDeduction,
  deleteDeduction,
  getAll,
} = require('./controllers/deductionsController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .get('/all', validateToken, checkRole(['admin', 'user']), getAll)
  .post(
    '/create-deduction',
    validateToken,
    checkRole(['admin', 'user']),
    createDeduction
  )
  .delete(
    '/delete-deduction',
    validateToken,
    checkRole(['admin', 'user']),
    deleteDeduction
  )

module.exports = router
