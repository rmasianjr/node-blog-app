const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/new', postController.newPost);
router.post(
  '/',
  postController.upload,
  catchErrors(postController.resize),
  catchErrors(postController.createPost)
);

router.get('/', catchErrors(postController.getPosts));

router.get('/:id', catchErrors(postController.getSinglePost));

module.exports = router;
