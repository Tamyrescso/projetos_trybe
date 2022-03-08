const errorMessage = {
  nameRequired: { message: '"name" is required' },
  nameLength: { message: '"name" length must be at least 5 characters long' },
  quantityRequired: { message: '"quantity" is required' },
  quantityLength: { message: '"quantity" must be greater than or equal to 1' },
  productRequired: { message: '"productId" is required' },
};

const errorCode = {
  badRequest: 400,
  unprocessableEntity: 422,
};

const blank = (value) => value === undefined;
const isLesserThan = (value, min) => value < min;

const validateProducts = (name, quantity) => {
  switch (true) {
    case blank(name):
      return { code: errorCode.badRequest, data: errorMessage.nameRequired };
    case blank(quantity):
      return { code: errorCode.badRequest, data: errorMessage.quantityRequired };
    case isLesserThan(name.length, 5):
      return { code: errorCode.unprocessableEntity, data: errorMessage.nameLength };
    case isLesserThan(quantity, 1):
      return { code: errorCode.unprocessableEntity, data: errorMessage.quantityLength };
    default:
      return null;
  }
};

const validateSales = (productId, quantity) => {
  switch (true) {
    case blank(productId):
      return { code: errorCode.badRequest, data: errorMessage.productRequired };
    case blank(quantity):
      return { code: errorCode.badRequest, data: errorMessage.quantityRequired };
    case isLesserThan(quantity, 1):
      return { code: errorCode.unprocessableEntity, data: errorMessage.quantityLength };
    default:
      return null;
  }
};

module.exports = {
  validateProducts,
  validateSales,
};
