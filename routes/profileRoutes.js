const express = require("express");
const router = express.Router();

const {
  myProfile,
  createProfile,
  getProfiles,
  getProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/me", protect, myProfile);
router.route("/").get(getProfiles).post(protect, createProfile);
router.route("/user/:user_id").get(getProfile);

module.exports = router;
