const express = require("express");
const router = express.Router();

const {
  myProfile,
  createProfile,
  getProfiles,
  getProfile,
  deleteUser,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithub,
} = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/me", protect, myProfile);
router
  .route("/")
  .get(getProfiles)
  .post(protect, createProfile)
  .delete(protect, deleteUser);
router.route("/user/:user_id").get(getProfile);
router.put("/experience", protect, addExperience);
router.delete("/experience/:exp_id", protect, deleteExperience);
router.put("/education", protect, addEducation);
router.delete("/education/:ed_id", protect, deleteEducation);

router.get("/github/:username", getGithub);

module.exports = router;
