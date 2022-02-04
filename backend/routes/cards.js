const express = require('express');
const { card: cardValidator } = require('../middleware/validator');
const {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.get('/:id', getCard);
router.post('/', cardValidator, createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
module.exports = router;
