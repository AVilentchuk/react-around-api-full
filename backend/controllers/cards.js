const Card = require('../models/card');
// const ServerError = require('../components/ServerError');
const errorHandler = require('../scripts/errorHandler');
const { cardNotFound } = require('../constants/errors');

// <<START>> List of Errors <<START>>
// const error404 = new ServerError({
//   message: 'No card found with that id',
//   name: 'NotFound',
//   code: 404,
// });
// <<END>> List of Errors <<END>>
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.getCard = (req, res) => {
  Card.findOne({ _id: req.params.id })
    .orFail(() => {
      throw cardNotFound;
    })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
    likes
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.deleteCard = async (req, res) => {
  console.log(req.params.id, req.user._id);
  Card.checkIfOwner(req.params.id, req.user._id)
    .then((card) => Card.deleteOne(card).then(res.send({ message: 'Deleted successfully' })))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw cardNotFound;
    })
    .then((card) => res.send(card))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true }
)
  .orFail(() => {
    throw cardNotFound;
  })
  .then((card) => res.send(card))
  .catch((err) => errorHandler(req, res, err));
// <<END>> Main Functions <<END>>
