const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authorizationError } = require('../constants/errors');
const errorHandler = require('../scripts/errorHandler');

const { JWT_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorHandler(req, res, authorizationError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return errorHandler(req, res, authorizationError);
  }
  req.user = payload;

  return next();
};
