const mongoose = require('mongoose');
const mailValidator = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
// const { validationError } = require('../components/errors');
const errors = require('../constants/errors');
// const errors = require('../components/errors');
// const ServerError = require('../components/ServerError');
// const validationError = new ServerError({
//   message: 'Incorrect email or password',
//   name: 'loginFailed',
//   code: 400,
// });
// const mailError = new ServerError({
//   message: 'This email has been already used',
//   name: 'registerFailed',
//   code: 409,
// });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    validate: {
      validator(avatar) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
          avatar
        );
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    validate: {
      validator(email) {
        return mailValidator(email);
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(errors.validationError);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(errors.validationError);
        }

      });
      return user;
    });
};

userSchema.statics.encryptAndCreateUser = function encryptAndCreateUser({
  name,
  about,
  avatar,
  email,
  password
}) {
  return bcrypt.hash(password, 10).then((hash) => this.create({
    name,
    about,
    avatar,
    email,
    password: hash
  })
    .then((user) => this.findOne(user))
    .catch((err) => {
      if (err.code === 11000) return Promise.reject(errors.usedEmail);
      return Promise.reject(err);
    }));
};

module.exports = mongoose.model('user', userSchema);
