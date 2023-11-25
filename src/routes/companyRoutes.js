const express = require('express')
const router = express.Router()
const {
  getAllCompanies,
  createCompany,
  getCompanyById
} = require('./controllers/companyController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .get('/all', validateToken, checkRole(['superAdmin']), getAllCompanies)
  .get(
    '/find-company/:id',
    validateToken,
    checkRole(['superAdmin', 'admin']),
    getCompanyById
  )
  .post(
    '/create-company',
    validateToken,
    checkRole(['superAdmin']),
    createCompany
  )

module.exports = router
