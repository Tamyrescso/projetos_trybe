const express = require('express');
const productsControllers = require('../controllers/productsController');
const validations = require('../middlewares/validations');

const router = express.Router();

router.get(
  '/',
  productsControllers.list,
);

router.get(
  '/:id',
  productsControllers.productById,
);

router.post(
  '/',
  validations.products,
  productsControllers.create,
);

router.put(
  '/:id',
  validations.products,
  productsControllers.update,
);

router.delete(
  '/:id',
  productsControllers.exclude,
);

module.exports = router;