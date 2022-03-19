const express = require('express');
const {
  getPosts,
  getPostById,
  create,
  update,
  destroy,
  findByQuery } = require('../controllers/postControllers');
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
  getPosts,
);

router.get(
  '/search',
  auth,
  findByQuery,
);

router.get(
  '/:id',
  auth,
  getPostById,
);

router.put(
  '/:id',
  auth,
  update,
);

router.delete(
  '/:id',
  auth,
  destroy,
);

module.exports = router;