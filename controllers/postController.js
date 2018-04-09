const Post = require('../models/Post');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

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
  res.render('newPost', { title: 'Create Post' });
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
  const newPost = new Post(req.body);
  await newPost.save();
  res.redirect('/posts');
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.render('posts', { title: 'My Posts', posts });
};

exports.getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { title: post.title, post });
};
