const { celebrate, Joi } = require('celebrate');
const errorHandler = require('../scripts/errorHandler');
const { invalidRequest } = require('../constants/errors');

module.exports.sign = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).email().error(invalidRequest),
    password: Joi.string().required().min(2).error(invalidRequest),
  }),
});

module.exports.updateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).error(invalidRequest),
      about: Joi.string().min(2).max(30).error(invalidRequest),
      avatar: Joi.string().uri().error(invalidRequest),
    })
    .unknown(true),
});

module.exports.card = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).error(invalidRequest)s,
      link: Joi.string().required().uri().error(invalidRequest),
    })
    .unknown(true),
});
