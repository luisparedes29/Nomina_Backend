const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("./controllers/userController");

router
  .post("/signup", registerUser)

  .post("/login", loginUser);

module.exports = router;
