const express = require("express");
const router = express.Router();

const {
  myProfile,
  createProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/me", protect, myProfile);
router.post("/", protect, createProfile);

module.exports = router;
