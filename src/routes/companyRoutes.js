const express = require("express");
const router = express.Router();
const { getAllCompanies, createCompany, getCompanyById   editCompany, deleteCompany } = require("./controllers/companyController");
const {validateToken, checkRole} = require("./controllers/jwtAuth");
const {validateCreate, validateGetById} = require("./validators/companyRoutes")

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
