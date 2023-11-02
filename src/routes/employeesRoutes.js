const express = require("express");
const router = express.Router();
const {createEmployee, allEmployees, deleteOne} = require('./controllers/employeesController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");
 
router
  .post("/create", createEmployee) // La protección de ruta con el chequeo del rol de "admin" está aquí solo para probar que funcione.
                                                                        // Debe borrarse lueego y proteger las rutas adecuadamente segun los roles que les correspondan
  .get("/all", allEmployees)

  .delete("/delete/:_id", deleteOne)
module.exports = router;
