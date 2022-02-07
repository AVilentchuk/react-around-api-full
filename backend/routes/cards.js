const router = require('express').Router();
const { card: cardValidator } = require('../middleware/validator');
const {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', cardValidator, getCards);
router.get('/:id', cardValidator, getCard);
router.post('/', cardValidator, createCard);
router.delete('/:id', cardValidator, deleteCard);
router.put('/:id/likes', cardValidator, likeCard);
router.delete('/:id/likes', cardValidator, dislikeCard);
//added validation to the rest of the routes even though as it says "Server request bodies should be validated prior to submitting them to controllers for processing"
//please notice that the bodies of most of these requests are empty and id is contained in the req.params.id hence shouldn't be validated. more information here https://expressjs.com/en/api.html#req.params

module.exports = router;
