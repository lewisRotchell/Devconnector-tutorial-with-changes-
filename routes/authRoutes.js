const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const { register, getMe, login } = authController;
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
