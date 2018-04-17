const Post = require('../models/Post');
const Comment = require('../models/Comment');

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

exports.confirmCommentOwner = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const comment = await Comment.findById(req.params.commentId);
    // comment.author.id === req.user._id, other way, since comments autopopulate
    if (comment.author.equals(req.user._id)) {
      next();
    } else {
      req.flash('danger', 'You are not allowed to do that!');
      res.redirect(`/posts/$${req.params.id}`);
    }
  } else {
    req.flash('danger', 'You must be signed in to do that!');
    res.redirect('/auth/login');
  }
};
