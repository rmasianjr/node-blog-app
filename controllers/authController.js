const passport = require('passport');

exports.signIn = (req, res) => {
  res.render('sign', { title: 'Sign in', sub: 'Please sign in to proceed.' });
};

exports.signUp = (req, res) => {
  res.render('sign', {
    title: 'Sign up',
    sub: 'Create an account and start writing.'
  });
};

exports.authWithGoogle = passport.authenticate('google', {
  scope: ['profile']
});

exports.googleRedirect = passport.authenticate('google', {
  failureRedirect: '/',
  failureFlash: 'Failed Login!',
  successRedirect: '/posts',
  successFlash: 'You are now login!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};
