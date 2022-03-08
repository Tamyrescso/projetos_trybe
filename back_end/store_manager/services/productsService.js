const productsModel = require('../models/productsModel');

const list = async () => {
  const modelResponse = await productsModel.list();

  return { code: 200, data: modelResponse };
};

const productById = async (id) => {
  const modelResponse = await productsModel.productById(id);

  if (!modelResponse) return null;

  return { code: 200, data: modelResponse };
};

const create = async (obj) => {
  const { name, quantity } = obj;

  const allProducts = await productsModel.list();
  
  const isProductNotUnique = allProducts.find((p) => p.name === name);

  if (isProductNotUnique) return null;
  
  const modelResponse = await productsModel.create(name, quantity);

  if (!modelResponse) return null;

  return { code: 201, data: modelResponse };
};

const update = async (name, quantity, id) => {
  const isAnExistentId = await productById(id);
  if (!isAnExistentId) return null;

  const modelResponse = await productsModel.update(name, quantity, id);

  return { code: 200, data: modelResponse };
};

const exclude = async (id) => {
  const isAnExistentId = await productById(id);
  if (!isAnExistentId) return null;

  await productsModel.exclude(id);

  return { code: 204 };
};

module.exports = {
  list,
  productById,
  create,
  update,
  exclude,
};