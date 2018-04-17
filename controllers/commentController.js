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

exports.deleteComment = async (req, res) => {
  const commentPromise = Comment.findByIdAndRemove(req.params.commentId);

  // remove element, ref to deleted comment
  const postPromise = Post.findOneAndUpdate(
    { comments: req.params.commentId },
    {
      $pull: { comments: req.params.commentId }
    }
  );

  await Promise.all([commentPromise, postPromise]);

  req.flash('success', 'Comment successfully deleted');
  res.redirect(`/posts/${req.params.id}`);
};
