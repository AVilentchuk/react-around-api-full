const Card = require('../models/card');
const errorHandler = require('../scripts/errorHandler');
const { cardNotFound } = require('../constants/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.getCard = (req, res) => {
  Card.findOne({ _id: req.params.id })
    .populate(['likes', 'owner'])
    .orFail(() => {
      throw cardNotFound;
    })
    .then((card) => {
      res.send({ data: card });
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
      Card.findOne(card)
        .populate(['likes', 'owner'])
        .then((returnedCard) => res.send(returnedCard));
    })
    .catch((err) => errorHandler(req, res, err));
};

module.exports.deleteCard = async (req, res) => {
  Card.checkIfOwner(req.params.id, req.user._id)
    .then((card) => Card.deleteOne(card)
      .then(res.send({ message: 'Deleted successfully' })))
    .catch((err) => errorHandler(req, res, err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .populate(['likes', 'owner'])
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
  .populate(['likes', 'owner'])
  .orFail(() => {
    throw cardNotFound;
  })
  .then((card) => {
    res.send(card);
  })
  .catch((err) => errorHandler(req, res, err));
// <<END>> Main Functions <<END>>
