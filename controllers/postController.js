const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createPost = catchAsync(async (req, res, next) => {
  const user = req.user;

  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  });

  console.log(newPost);

  const post = await newPost.save();
  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  console.log(req.user.id);
  console.log(post.user.toString());

  if (post.user.toString() !== req.user.id) {
    return next(
      new AppError("User is not authorized to delete this post", 401)
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  //Check if post has already been liked by this user
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(new AppError("Post has already been liked by this user", 400));
  }

  post.likes.unshift({
    user: req.user.id,
  });

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  //Check if post has already been liked by this user
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(new AppError("Post has not yet been liked by this user", 400));
  }

  //Get the remove index
  const removeIndex = post.likes.map((like) =>
    like.user.toString().indexOf(req.user.id)
  );

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const user = req.user;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("post not found"));
  }

  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  };

  post.comments.unshift(newComment);

  await post.save();
  res.status(200).json({
    success: true,
    data: post.comments,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  //pull out comment from post
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  //make sure comment exists
  if (!comment) {
    return next(new AppError("comment not found", 404));
  }

  //Check user
  if (comment.user.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to delete this comment", 401)
    );
  }

  //Get the remove index
  const removeIndex = post.comments.map((comment) =>
    comment.user.toString().indexOf(req.user.id)
  );

  post.comments.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    success: true,
    data: post.comments,
  });
});
