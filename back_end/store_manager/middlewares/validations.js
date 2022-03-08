const { validateProducts, validateSales } = require('../schema/validations');

const products = async (req, res, next) => {
  const { name, quantity } = req.body;
  const validate = validateProducts(name, quantity);

  if (!validate) return next();

  const { code, data } = validate;
  return res.status(code).json(data);
};

const sales = (req, res, next) => {
  const sale = req.body;
  let result = null;
  for (let i = 0; i < sale.length; i += 1) {
    if (validateSales(sale[i].productId, sale[i].quantity) !== null) {
      result = validateSales(sale[i].productId, sale[i].quantity);
      break;
    }
  }

  if (!result) return next();

  const { code, data } = result;
  return res.status(code).json(data);
};

module.exports = {
  products,
  sales,
};