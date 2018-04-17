const express = require('express');
const router = express.Router({ mergeParams: true });

const { catchErrors } = require('../handlers/errorHandlers');
const middleware = require('../handlers/middleware');
const commentController = require('../controllers/commentController');

router.post(
  '/',
  middleware.isLoggedIn,
  catchErrors(commentController.createComment)
);

module.exports = router;
