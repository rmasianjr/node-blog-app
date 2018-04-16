const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');
const middleware = require('../handlers/middleware');

router.get('/new', middleware.isLoggedIn, postController.newPost);
router.post(
  '/',
  middleware.isLoggedIn,
  postController.upload,
  catchErrors(postController.resize),
  catchErrors(postController.createPost)
);

router.get('/', catchErrors(postController.getPosts));

router.get('/:id', catchErrors(postController.getSinglePost));

router.get(
  '/:id/edit',
  catchErrors(middleware.confirmOwner),
  catchErrors(postController.editPost)
);
router.put(
  '/:id',
  catchErrors(middleware.confirmOwner),
  postController.upload,
  catchErrors(postController.resize),
  catchErrors(postController.updatePost)
);

router.delete(
  '/:id',
  catchErrors(middleware.confirmOwner),
  catchErrors(postController.deletePost)
);

module.exports = router;
