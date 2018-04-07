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

exports.developmentErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { error: err, message: err.message });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
};
