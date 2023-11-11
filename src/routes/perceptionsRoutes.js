const express = require("express");
const router = express.Router();
const { getAll,  createPerception, deleteOne } = require('./controllers/perceptionsController')
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
.post(
  '/create-perception',
  validateToken,
  checkRole('admin'),
  createPerception 
 )
.get(
  '/all',
  validateToken,
  getAll
 )
.delete(
  '/delete-perception/:_id',
  validateToken,
  checkRole('admin'),
  deleteOne
 )

module.exports = router