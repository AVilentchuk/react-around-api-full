const { celebrate, Joi } = require('celebrate');

module.exports.sign = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(2)
  })
});

module.exports.user = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri()
  })
});

module.exports.card = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri()
  })
});
