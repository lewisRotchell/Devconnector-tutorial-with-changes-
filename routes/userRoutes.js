const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const { getAllUsers, registerUser } = userController;

router.route("/").get(getAllUsers).post(registerUser);

module.exports = router;
