const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = postController;
const { protect } = require("../middleware/auth");

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id").get(protect, getPost).delete(protect, deletePost);
router.route("/like/:id").put(protect, likePost);
router.route("/unlike/:id").put(protect, unlikePost);
router.route("/comment/:id").post(protect, addComment);
router.route("/comment/:id/:comment_id").delete(protect, deleteComment);

module.exports = router;
