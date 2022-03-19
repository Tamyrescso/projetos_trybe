const express = require('express');
const { create, getUsers, getUserById, destroy } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/',
  create,
);

router.get(
  '/',
  auth,
  getUsers,
);

router.get(
  '/:id',
  auth,
  getUserById,
);

router.delete(
  '/me',
  auth,
  destroy,
);

module.exports = router;