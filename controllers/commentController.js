const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  req.body.author = req.user._id;
  const comment = await new Comment(req.body).save();
  const post = await Post.findById(req.params.id);
  post.comments.push(comment);
  await post.save();
  req.flash('success', 'Comment successfully added');
  res.redirect('back');
};
