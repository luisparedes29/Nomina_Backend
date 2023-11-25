const express = require('express');
const router = express.Router();
const { registerUser, getAllUsersOfCompany, loginUser, editUser, deleteUser } = require('./controllers/userController');
const {validateToken, checkRole} = require("./controllers/jwtAuth");

router
  .get(
    '/all-company/:id',
    validateToken,
    checkRole(["admin", "super-admin"]),
    getAllUsersOfCompany
  )
  .post(
    '/signup/:id',
    validateToken,
    checkRole(["admin", "super-admin"]),
    registerUser
  )
  .post(
    '/login/',
    loginUser
  )
  .put(
    '/edit/:id',
    validateToken,
    checkRole(["admin", "super-admin"]),
    editUser
  )
  .delete(
    '/delete/:id',
    validateToken,
    checkRole(["admin", "super-admin"]),
    deleteUser
  )

module.exports = router;
