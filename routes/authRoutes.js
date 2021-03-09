const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const { register, getMe } = authController;
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.get("/me", protect, getMe);

module.exports = router;
