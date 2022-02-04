const router = require('express').Router();
const { updateUser: userValidator } = require('../middleware/validator');
const {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getSelf,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:id', getUser);
router.post('/', userValidator, createUser);
router.patch('/me', userValidator, updateProfile);
router.patch('/me/avatar', userValidator, updateAvatar);

module.exports = router;
