const { celebrate, Joi } = require('celebrate');
const errorHandler = require('../scripts/errorHandler');
const { invalidRequest } = require('../constants/errors');

module.exports.sign = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().min(6).email(),
      password: Joi.string().required().min(2),
    })
    .error(() => Promise.reject(invalidRequest)),
});

module.exports.updateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    })
    .error(() => Promise.reject(invalidRequest))
    .unknown(true),
});

module.exports.card = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    })
    .error(() => Promise.reject(invalidRequest))
    .unknown(true),
});
