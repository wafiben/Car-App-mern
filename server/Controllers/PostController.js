const { response } = require("express");
const Post = require("../models/Post");
const getPosts = async (request, response) => {
  try {
    const posts = await Post.find();
    response.status(200).json(posts);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
const createPost = async (request, response) => {
  const post = request.body;
  try {
    const newPost = new Post({
      model:post.model,
      descreption:post.descreption,
      SelectedFile:request.file.filename,
      price:post.price,
      user:request.user._id
    });
    await newPost.save();
    response.status(200).json(newPost);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
const updatePost = async (request, response) => {
  const id = request.params.id;
  const newPost = request.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, newPost, {
      new: true,
    });
    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ error: "update failed" });
  }
};
const deletePost = async (request, response) => {
  try {
    const id = request.params.id;
    await Post.findByIdAndDelete(id);
    response.status(200).json({ message: "car has been succeffly deleted" });
  } catch (error) {
    response.status(500).json({ error: "delete has been  failed" });
  }
};
const likePost = async (request, response) => {
  const id = request.params.id;
  try {
    const post = await Post.findById(id);
    // check if user do like
    const like = await post.likes.find(
      (like) => like.user.toString() === request.user._id.toString()
    );

    if (like) {
      post.likes = post.likes.filter(
        (elt) => elt.user.toString() !== request.user._id.toString()
      );
      // response
      //   .status(400)
      //   .json({ msg: "you can not like the same item twice" });
    } else {
      post.likes = [...post.likes, { user: request.user._id }];
    }

    await post.save();
    console.log("post likes",post.likes);
    response.status(200).json({ likeCount: post.likes.length });
  } catch (error) {
    console.log(error);
  }
};
const getOnePost=async(request,response)=>{
  const id =request.params.id
  try {
    const foundPost=await Post.findById(id).populate('user',['name','email','phone'])
    response.status(200).json({post:foundPost})
  } catch (error) {
    response.status(500).json({error:'failed to get specefic post'})
  }
}
module.exports = { getOnePost, getPosts, createPost, updatePost, deletePost, likePost };
