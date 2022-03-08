const salesService = require('../services/salesService');

const list = async (_req, res, next) => {
  try {
    const { code, data } = await salesService.list();
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const saleById = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const sales = await salesService.saleById(id);

    if (sales === null) return res.status(404).json({ message: 'Sale not found' });

    const { code, data } = sales;
  
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  const sale = [...req.body];
  try {
    const createProduct = await salesService.create(sale);
    const { code, data } = createProduct;

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const sale = [...req.body];
    const { id } = req.params;

    const updateProduct = await salesService.update(sale, id);
    if (!updateProduct) return res.status(404).json({ message: 'Sale not found' });

    const { code, data } = updateProduct;

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;

    const excludeSale = await salesService.exclude(id);
    if (!excludeSale) return res.status(404).json({ message: 'Sale not found' });

    const { code } = excludeSale;

    return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  list,
  saleById,
  create,
  update,
  exclude,
};