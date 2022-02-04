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


router.get('/', getCards);
router.get('/:id', getCard);
router.post('/', cardValidator, createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
module.exports = router;
