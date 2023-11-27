const express = require("express");
const router = express.Router();
const { getAllCompanies, createCompany, getCompanyById } = require("./controllers/companyController");
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    "/all",
    validateToken,
    checkRole(["super-admin"]),
    getAllCompanies,
  )
  .get(
    "/find-company/:id",
    validateToken,
    checkRole(["super-admin", "admin"]),
    getCompanyById
  )
  .post(
    "/create-company",
    validateToken,
    checkRole(["super-admin"]),
    createCompany
  );

module.exports = router;
