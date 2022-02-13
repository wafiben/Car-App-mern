const User = require("../models/User");
const Post = require("../models/Post");
const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json({ users: users });
  } catch (error) {
    response.status(400).json({ errors: [{ msg: "failed to get users" }] });
  }
};
const getAllposts = async (request, response) => {
  try {
    const posts = await Post.find();
    response.status(200).json({ posts: posts });
  } catch (error) {
    response.status(400).json({ errors: [{ msg: "failed to get posts" }] });
  }
};
const deleteUser = async (request, response) => {
  try {
    const id = request.params.id;
    await User.findByIdAndDelete(id);
    response.status(200).json({ message: "user has been succeffly deleted" });
  } catch (error) {
    response.status(500).json({ error: "delete has been  failed" });
  }
};
const deletePost = async (request, response) => {
  try {
    const id = request.params.id;
    await Post.findByIdAndDelete(id);
    response.status(200).json({ message: "post has been succeffly deleted" });
  } catch (error) {
    response.status(500).json({ error: "delete has been  failed" });
  }
};
module.exports = { getAllUsers, deleteUser, getAllposts,deletePost };
