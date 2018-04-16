const Post = require('../models/Post');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const { promisify } = require('es6-promisify');
const fs = require('fs');
const path = require('path');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      cb(null, true);
    } else {
      cb({ message: "Filetype isn't allowed!" }, false);
    }
  }
};

exports.newPost = (req, res) => {
  res.render('editPost', { title: 'Create Post' });
};

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  const image = await jimp.read(req.file.buffer);
  await image.resize(600, jimp.AUTO);
  await image.write(`./public/uploads/${req.body.image}`);
  next();
};

exports.createPost = async (req, res) => {
  req.body.author = req.user._id;
  const newPost = new Post(req.body);
  await newPost.save();
  req.flash(
    'success',
    `Successfully created <strong>${newPost.title}</strong>.`
  );
  res.redirect(`/posts/${newPost._id}`);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  res.render('posts', { title: 'My Posts', posts });
};

exports.getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { title: post.title, post });
};

exports.editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('editPost', { title: `Edit ${post.title}`, post });
};

exports.updatePost = async (req, res) => {
  const oldPost = await Post.findById(req.params.id);

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (oldPost.image && oldPost.image !== post.image) {
    const unlink = promisify(fs.unlink);
    await unlink(path.join(__dirname, `../public/uploads/${oldPost.image}`));
  }

  req.flash(
    'success',
    `Successfully updated <strong>${post.title}</strong>. <a href="/posts/${
      post._id
    }">View post</a>`
  );

  res.redirect('back');
};

exports.deletePost = async (req, res, next) => {
  const unlink = promisify(fs.unlink);
  const post = await Post.findByIdAndRemove(req.params.id);

  if (post.image) {
    await unlink(path.join(__dirname, `../public/uploads/${post.image}`));
  }

  req.flash('success', `Sucessfully deleted <strong>${post.title}</strong>`);
  res.redirect('/posts');
};
