const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/new', postController.newPost);
router.post('/', postController.createPost);

module.exports = router;
