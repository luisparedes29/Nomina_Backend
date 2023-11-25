const express = require("express");
const router = express.Router();
const { getAll,  createPerception, deleteOne } = require('./controllers/perceptionsController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
.post(
  '/create-perception',
  validateToken,
  checkRole(["admin", "user"]),
  createPerception 
 )
.get(
  '/all',
  validateToken,
  checkRole(["admin", "user"]),
  getAll
 )
.delete(
  '/delete-perception/:_id',
  validateToken,
  checkRole(["admin", "user"]),
  deleteOne
 )

module.exports = router