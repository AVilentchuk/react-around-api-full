const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getSelf,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
