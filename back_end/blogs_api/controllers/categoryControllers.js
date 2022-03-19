const { createCategories, findCategories } = require('../services/categoryServices');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createCategory = await createCategories(name);

    const { code, data } = createCategory;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getCategories = async (_req, res, next) => {
  try {
    const findAllCategories = await findCategories();

    const { code, data } = findAllCategories;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getCategories,
};