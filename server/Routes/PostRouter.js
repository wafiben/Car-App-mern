const express = require("express");
const router = express.Router();
const {
  getOnePost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../Controllers/PostController");
const isAuth = require("../midelware/isAuth");
const upload = require("../midelware/uploads");
router.get("/", getPosts);
router.post("/", isAuth,upload.single('SelectedFile'), createPost);
router.put("/:id", isAuth, updatePost);
router.delete("/:id", isAuth, deletePost);
router.put("/:id/likePost", isAuth, likePost);
router.get("/:id", getOnePost);

module.exports = router;
