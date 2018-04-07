const Post = require('../models/Post');

exports.newPost = (req, res) => {
  res.render('newPost', { title: 'Create Post' });
};

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.redirect('/posts');
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.render('posts', { title: 'My Posts', posts });
};
