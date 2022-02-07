const router = require('express').Router();
const { card: cardValidator } = require('../middleware/validator');
const {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

router.get('/', cardValidator, getCards);
router.get('/:id', cardValidator, getCard);
router.post('/', cardValidator, createCard);
router.delete('/:id', cardValidator, deleteCard);
router.put('/:id/likes', cardValidator, likeCard);
router.delete('/:id/likes', cardValidator, dislikeCard);

module.exports = router;
