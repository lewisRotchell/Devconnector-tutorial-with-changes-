const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const { register } = authController;

router.post("/register", register);

module.exports = router;
