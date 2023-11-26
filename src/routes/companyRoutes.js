const express = require("express");
const router = express.Router();
const { getAllCompanies, createCompany, getCompanyById } = require("./controllers/companyController");
const {validateToken, checkRole} = require("./controllers/jwtAuth");
const {validateCreate, validateGetById} = require("./validators/companyRoutes")

router
  .get("/all", getAllCompanies) // La protección de ruta con el chequeo del rol de "admin" está aquí solo para probar que funcione.
                                                                        // Debe borrarse lueego y proteger las rutas adecuadamente segun los roles que les correspondan

  .get("/find-company/:id", validateGetById, getCompanyById)

  .post("/create-company",  validateCreate, createCompany);

module.exports = router;
