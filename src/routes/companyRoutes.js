const express = require("express");
const router = express.Router();
const { getAllCompanies, createCompany, getCompanyById } = require("./controllers/companyController");
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    "/all",
    validateToken,
    getAllCompanies,
  )
  .get(
    "/find-company/:id",
    validateToken,
    getCompanyById
  )
  .post(
    "/create-company",
    validateToken,
    checkRole("super-admin"),
    createCompany
  );

module.exports = router;
