const express = require('express');
const { create, getCategories } = require('../controllers/categoryControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/',
  auth,
  create,
);

router.get(
  '/',
  auth,
  getCategories,
);

module.exports = router;