const { Category } = require('../models');

const createCategories = async (name) => {
  if (!name) return { code: 400, data: { message: '"name" is required' } };

  const alreadyExists = await Category.findOne({ where: { name } });
  if (alreadyExists) return { code: 409, data: { message: 'Category already registered' } };

  const newCategory = await Category.create({ name });
  const { dataValues } = newCategory;

  return { code: 201, data: dataValues };
};

const findCategories = async () => {
  const categories = await Category.findAll();

  return { code: 200, data: categories };
};

module.exports = {
  createCategories,
  findCategories,
};