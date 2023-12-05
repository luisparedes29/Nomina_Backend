const express = require('express')
const router = express.Router()
const {upload} =require('./controllers/uploadController')
const {
  getAllCompanies,
  createCompany,
  getCompanyById,
  editCompany,
  deleteCompany
} = require('./controllers/companyController')
const { validateToken, checkRole } = require('./controllers/jwtAuth')

router
  .get('/all',  getAllCompanies)
  .get(
    '/find-company/:id',
    validateToken,
    checkRole(['superAdmin', 'admin']),
    getCompanyById
  )
  .post(
    '/create-company',
    
    upload.single('logo'),
    createCompany
  )

  .put(
    '/edit-company/:id',
    upload.single('logo'),
    editCompany
  )

  .delete(
    '/delete-company/:id',
    validateToken,
    checkRole(['superAdmin']),
    deleteCompany
  )

module.exports = router
