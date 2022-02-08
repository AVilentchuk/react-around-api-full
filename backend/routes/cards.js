const router = require('express').Router();
const {
  createCardValidator,
  cardActionsValidator
} = require('../middleware/validator');
const {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

router.get('/', getCards);
router.get('/:id', cardActionsValidator, getCard);
router.post('/', createCardValidator, createCard);
router.delete('/:id', cardActionsValidator, deleteCard);
router.put('/:id/likes', cardActionsValidator, likeCard);
router.delete('/:id/likes', cardActionsValidator, dislikeCard);

module.exports = router;
