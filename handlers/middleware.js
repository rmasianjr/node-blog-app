const Post = require('../models/Post');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('danger', 'You must be signed in to do that!');
  res.redirect('/auth/signin');
};

exports.confirmOwner = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const post = await Post.findById(req.params.id);
    if (post.author.equals(req.user._id)) {
      next();
    } else {
      req.flash('danger', 'You are not allowed to do that!');
      res.redirect(`/posts/${post.id}`);
    }
  } else {
    req.flash('danger', 'You must be signed in to do that!');
    res.redirect('/auth/signin');
  }
};
