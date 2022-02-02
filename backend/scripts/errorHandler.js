const { errLogger } = require('./logging');

const errorTypeCheck = (error) => {
  const errorOut = new Error(error.name);
  if (error.name === 'NotFound') {
    errorOut.code = 404;
    errorOut.message = 'Page not found';
  } else if (error.name === 'ValidationError' || 'CastError') {
    errorOut.code = 400;
    errorOut.message = 'Validation failed';
  } else {
    errorOut.code = 500;
    errorOut.message = 'An error has occurred';
  }
  return errorOut;
};

module.exports = (req, res, err) => {
  if (err.message && err.code) {
    errLogger.error({ error: err, request: req, response: res });
    res.status(err.code).send({
      message: err.message
    });
  } else {
    const newErr = errorTypeCheck(err);
    errLogger.error({ error: newErr, request: req, response: res });
    res.status(newErr.code).send({
      message: newErr.message
    });
  }
};
