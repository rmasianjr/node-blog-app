const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/new', postController.newPost);
router.post('/', catchErrors(postController.createPost));

router.get('/', catchErrors(postController.getPosts));

module.exports = router;
