const express = require('express');
const salesControllers = require('../controllers/salesController');
const validations = require('../middlewares/validations');

const router = express.Router();

router.get(
  '/',
  salesControllers.list,
);

router.get(
  '/:id',
  salesControllers.saleById,
);

router.post(
  '/',
  validations.sales,
  salesControllers.create,
);

router.put(
  '/:id',
  validations.sales,
  salesControllers.update,
);

router.delete(
  '/:id',
  salesControllers.exclude,
);

module.exports = router;