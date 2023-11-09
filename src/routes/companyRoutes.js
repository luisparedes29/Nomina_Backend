const express = require("express");
const router = express.Router();
const { getAllCompanies, createCompany, getCompanyById } = require("./controllers/companyController");
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get("/all", getAllCompanies) // La protección de ruta con el chequeo del rol de "admin" está aquí solo para probar que funcione.
                                                                        // Debe borrarse lueego y proteger las rutas adecuadamente segun los roles que les correspondan

  .get("/find-company/:id", getCompanyById)

  .post("/create-company", createCompany);

module.exports = router;
