const ServerError = require('../components/ServerError');

module.exports.validationError = new ServerError({
  message: 'Incorrect email or password',
  name: 'LoginFailed',
  code: 400,
});

module.exports.authorizationError = new ServerError({
  message: 'You are not logged in',
  name: 'Unauthorized',
  code: 401,
});

module.exports.usedEmail = new ServerError({
  message: 'This email has been already used',
  name: 'RegisterFailed',
  code: 409,
});

module.exports.userNotFound = new ServerError({
  message: 'No user found with that id',
  name: 'NotFound',
  code: 404,
});

module.exports.cardNotFound = new ServerError({
  message: 'No card found with that id',
  name: 'NotFound',
  code: 404,
});

module.exports.pageNotFound = new ServerError({
  message: 'Page not found',
  name: 'NotFound',
  code: 404,
});

module.exports.notOwner = new ServerError({
  message: 'You are not the owner of this',
  name: 'PermissionDenied',
  code: 403,
});
