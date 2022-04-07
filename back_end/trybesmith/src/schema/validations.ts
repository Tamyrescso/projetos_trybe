import { Products, Users, Login, OrderProducts } from '../interfaces';

const errorCodes = {
  badRequest: 400,
  unproceEntity: 422,
};

const errorMessages = {
  requiredAmount: { error: 'Amount is required' },
  stringAmount: { error: 'Amount must be a string' },
  lengthAmount: { error: 'Amount must be longer than 2 characters' },
  requiredName: { error: 'Name is required' },
  stringName: { error: 'Name must be a string' },
  lengthName: { error: 'Name must be longer than 2 characters' },
  requiredUsername: { error: 'Username is required' },
  stringUsername: { error: 'Username must be a string' },
  lengthUsername: { error: 'Username must be longer than 2 characters' },
  requiredClasse: { error: 'Classe is required' },
  stringClasse: { error: 'Classe must be a string' },
  lengthClasse: { error: 'Classe must be longer than 2 characters' },
  requiredLevel: { error: 'Level is required' },
  numberLevel: { error: 'Level must be a number' },
  lengthLevel: { error: 'Level must be greater than 0' },
  requiredPassword: { error: 'Password is required' },
  stringPassword: { error: 'Password must be a string' },
  lengthPassword: { error: 'Password must be longer than 7 characters' },
  requiredProducts: { error: 'Products is required' },
  arrayProducts: { error: 'Products must be an array of numbers' },
  emptyProducts: { error: 'Products can\'t be empty' },
};

const isUndefined = (value: any) => value === undefined;
const isNotString = (value: any) => typeof value !== 'string';
const isNotNumber = (value: any) => typeof value !== 'number';
const isNotAnArray = (value: any) => !Array.isArray(value);
const isLesserThan = (value: number, min: number) => value <= min;
const blank = (value: any) => !value.length;

const validateName = (name: any) => {
  switch (true) {
    case isUndefined(name):
      return { code: errorCodes.badRequest, data: errorMessages.requiredName };
    case isNotString(name):
      return { code: errorCodes.unproceEntity, data: errorMessages.stringName };
    case isLesserThan(name.length, 2):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthName };
    default:
      return null;
  }
};

const validateAmount = (amount: any) => {
  switch (true) {
    case isUndefined(amount):
      return { code: errorCodes.badRequest, data: errorMessages.requiredAmount };
    case isNotString(amount):
      return { code: errorCodes.unproceEntity, data: errorMessages.stringAmount };
    case isLesserThan(amount.length, 2):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthAmount };
    default:
      return null;
  }
};

const validateProduct = (product: Products) => {
  const { name, amount } = product;
  const nameInvalid = validateName(name);
  const amountInvalid = validateAmount(amount);

  if (nameInvalid) return nameInvalid;
  if (amountInvalid) return amountInvalid;

  return null;
};

const validateUsername = (Username: any) => {
  switch (true) {
    case isUndefined(Username):
      return { code: errorCodes.badRequest, data: errorMessages.requiredUsername };
    case isNotString(Username):
      return { code: errorCodes.unproceEntity, data: errorMessages.stringUsername };
    case isLesserThan(Username.length, 2):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthUsername };
    default:
      return null;
  }
};

const validateClasse = (Classe: any) => {
  switch (true) {
    case isUndefined(Classe):
      return { code: errorCodes.badRequest, data: errorMessages.requiredClasse };
    case isNotString(Classe):
      return { code: errorCodes.unproceEntity, data: errorMessages.stringClasse };
    case isLesserThan(Classe.length, 2):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthClasse };
    default:
      return null;
  }
};

const validateLevel = (Level: any) => {
  switch (true) {
    case isUndefined(Level):
      return { code: errorCodes.badRequest, data: errorMessages.requiredLevel };
    case isNotNumber(Level):
      return { code: errorCodes.unproceEntity, data: errorMessages.numberLevel };
    case isLesserThan(Level, 0):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthLevel };
    default:
      return null;
  }
};

const validatePassword = (Password: any) => {
  switch (true) {
    case isUndefined(Password):
      return { code: errorCodes.badRequest, data: errorMessages.requiredPassword };
    case isNotString(Password):
      return { code: errorCodes.unproceEntity, data: errorMessages.stringPassword };
    case isLesserThan(Password.length, 7):
      return { code: errorCodes.unproceEntity, data: errorMessages.lengthPassword };
    default:
      return null;
  }
};

const validateUser = (user: Users) => {
  const { username, classe, level, password } = user;
  const usernameInvalid = validateUsername(username);
  const classeInvalid = validateClasse(classe);
  const levelInvalid = validateLevel(level);
  const passwordInvalid = validatePassword(password);

  if (usernameInvalid) return usernameInvalid;
  if (classeInvalid) return classeInvalid;
  if (levelInvalid) return levelInvalid;
  if (passwordInvalid) return passwordInvalid;

  return null;
};

const validateLogin = (login: Login) => {
  const { username, password } = login;
  const usernameInvalid = validateUsername(username);
  const passwordInvalid = validatePassword(password);
  
  if (usernameInvalid) return usernameInvalid;
  if (passwordInvalid) return passwordInvalid;

  return null;
};

const validateOrder = (body: OrderProducts) => {
  const { products } = body;
  switch (true) {
    case isUndefined(products):
      return { code: errorCodes.badRequest, data: errorMessages.requiredProducts };
    case isNotAnArray(products):
      return { code: errorCodes.unproceEntity, data: errorMessages.arrayProducts };
    case blank(products):
      return { code: errorCodes.unproceEntity, data: errorMessages.emptyProducts };
    default:
      return null;
  }
};

export {
  validateProduct,
  validateUser,
  validateLogin,
  validateOrder,
};