const Post = require('../models/Post');

exports.newPost = (req, res) => {
  res.render('newPost', { title: 'Create Post' });
};

exports.createPost = (req, res, next) => {
  const newPost = new Post(req.body);
  newPost
    .save()
    .then(() => res.redirect('/'))
    .catch(next);
};
