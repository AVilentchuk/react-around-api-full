const express = require('express');
const { user: userValidator } = require('../middleware/validator');
const {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getSelf
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:id', getUser);
router.post('/', userValidator, createUser);
router.patch('/me', userValidator, updateProfile);
router.patch('/me/avatar', userValidator, updateAvatar);

module.exports = router;
