const { isCelebrateError } = require('celebrate');
const { errLogger } = require('./logging');
const ServerError = require('../components/ServerError');

const errorTypeCheck = (error) => {
  console.log(error);
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

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const {
      details: [errorDetails]
    } = errorBody;
    const celebrateErr = new ServerError({
      code: 400,
      message: `${errorDetails.message}`,
      name: 'ValidationFailed'
    });
    errLogger.error({ error: celebrateErr, request: req, response: res });
    res.status(celebrateErr.code).send({ message: celebrateErr.message });
  }

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
  next();
};
