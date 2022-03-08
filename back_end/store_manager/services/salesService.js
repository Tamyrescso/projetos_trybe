const salesModel = require('../models/salesModel');
const { productById } = require('../models/productsModel');

const list = async () => {
  const modelResponse = await salesModel.list();

  return { code: 200, data: modelResponse };
};

const saleById = async (id) => {
  const modelResponse = await salesModel.saleById(id);

  if (!modelResponse) return null;

  return { code: 200, data: modelResponse };
};

const create = async (array) => {
  const productsdata = await Promise.all(array.map((s) => productById(s.productId)));

  const isNotEnough = array.find(({ quantity }, index) => (
    (productsdata[index].quantity - quantity) < 1));
    
  if (isNotEnough) return { code: 422, data: { message: 'Such amount is not permitted to sell' } };

  const modelResponse = await salesModel.create(array);

  if (!modelResponse) return null;

  return { code: 201, data: modelResponse };
};

const update = async (array, id) => {
  const isAnExistentId = await saleById(id);
  if (!isAnExistentId) return null;

  const modelResponse = await salesModel.update(array, id);

  return { code: 200, data: modelResponse };
};

const exclude = async (id) => {
  const isAnExistentId = await saleById(id);
  if (!isAnExistentId) return null;

  await salesModel.exclude(id);

  return { code: 204 };
};

module.exports = {
  list,
  saleById,
  create,
  update,
  exclude,
};