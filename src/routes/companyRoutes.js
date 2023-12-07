const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const {
  getAllCompanies,
  createCompany,
  getCompanyById,
  editCompany,
  deleteCompany
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
    upload.single('logo'),
    createCompany
  )

  .put(
    '/edit-company/:id',
    validateToken,
    checkRole(['superAdmin']),
    editCompany
  )

  .delete(
    '/delete-company/:id',
    validateToken,
    checkRole(['superAdmin']),
    deleteCompany
  )

module.exports = router
