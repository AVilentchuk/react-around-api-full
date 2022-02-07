const { celebrate, Joi } = require('celebrate');
const { validationError }= require('../constants/errors');

module.exports.sign = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(2)
  }).error(()=>{return Promise.reject(validationError)})
});

module.exports.updateUser = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24)
  }).unknown(true),
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      _id: Joi.string().hex().length(24)
    }).error(()=>{return Promise.reject(validationError)})
    .unknown(true)
});

module.exports.card = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24)
  }).unknown(true).error(()=>{return Promise.reject(validationError)}),
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
      _id: Joi.string().hex().length(24)
    })
    .unknown(true).error(()=>{return Promise.reject(validationError)})
});
