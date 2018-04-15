const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/signin', authController.signIn);

router.get('/signup', authController.signUp);

router.get('/google', authController.authWithGoogle);

router.get('/google/callback', authController.googleRedirect);

router.get('/logout', authController.logout);

module.exports = router;
