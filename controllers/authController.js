const passport = require('passport');

exports.login = (req, res) => {
  res.render('login', { title: 'Log In' });
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
