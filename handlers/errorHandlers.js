const createError = require('http-errors');

// catch async/await errors in clean way. instead of using try/catch
exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  next(createError(404));
};

// flash mongodb validation errors
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  // use danger instead error. for css purposes -> layout.pug
  errorKeys.forEach(key => req.flash('danger', err.errors[key].message));
  res.redirect('back');
};

exports.developmentErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { error: err, message: err.message });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
};
