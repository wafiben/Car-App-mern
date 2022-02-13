const express = require("express");
const isAuth = require("../midelware/isAuth");
const isAdmin = require("../midelware/isAdmin");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getAllposts,
  deletePost,
} = require("../Controllers/adminController.js");
router.delete("/user/:id", isAuth, isAdmin, deleteUser);
router.delete("/post/:id", isAuth, isAdmin, deletePost);
router.get("/user", isAuth, isAdmin, getAllUsers);
router.get("/post", isAuth, isAdmin, getAllposts);
deletePost;

module.exports = router;
