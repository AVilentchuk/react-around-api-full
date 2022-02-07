require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../constants/errors');
const errorHandler = require('../scripts/errorHandler');

const { NODE_ENV, JWT_KEY } = process.env;

// <<START>> Main Functions <<START>>
module.exports.getUsers = (req, res) => {
  User.find({ _id: req.params.id })
    .orFail(() => {
      throw errors.userNotFound;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .orFail(() => {
      throw errors.userNotFound;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.getSelf = (req, res) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      throw errors.userNotFound;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.createUser = (req, res) => {
  User.encryptAndCreateUser(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw errors.userNotFound;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      errorHandler(req, res, err);
    });
};

module.exports.updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true }
)
  .orFail(() => {
    throw errors.userNotFound;
  })
  .then((user) => res.send(user))
  .catch((err) => {
    console.log(err);
    errorHandler(req, res, err);
  });

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_KEY : 'dev-secret',
        { expiresIn: '7h' }
      );
      res.send({ token });
    })
    .catch(() => errorHandler({ error: errors.authorizationError }));
};
// <<END>> Main Functions <<END>>
