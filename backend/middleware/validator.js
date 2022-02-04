const { celebrate, Joi } = require('celebrate');
const { invalidRequest } = require('../constants/errors');

module.exports.sign = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().min(6).email(),
      password: Joi.string().required().min(2),
    })
    .error(() => Promise.reject(invalidRequest))
});

module.exports.user = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      _id: Joi.string().hex().length(24).required(),
    })
    .unknown(true)
    .error(() => Promise.reject(invalidRequest))
});

module.exports.card = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    })
    .unknown(true)
    .error(() => Promise.reject(invalidRequest))
});
