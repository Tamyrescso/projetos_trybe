const productsService = require('../services/productsService');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await productsService.list();

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const productById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const products = await productsService.productById(id);
    if (!products) return res.status(404).json({ message: 'Product not found' });

    const { code, data } = products;

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const createProduct = await productsService.create({ name, quantity });
    if (!createProduct) return res.status(409).json({ message: 'Product already exists' });

    const { code, data } = createProduct;

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = await productsService.update(name, quantity, id);
    if (!updateProduct) return res.status(404).json({ message: 'Product not found' });

    const { code, data } = updateProduct;

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;

    const excludeProduct = await productsService.exclude(id);
    if (!excludeProduct) return res.status(404).json({ message: 'Product not found' });

    const { code } = excludeProduct;

    return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  list,
  productById,
  create,
  update,
  exclude,
};