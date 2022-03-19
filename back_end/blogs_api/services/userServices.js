const { User } = require('../models');
const { passwordValidation, emailValidation, nameValidation } = require('../schema/userValidation');
const jwtGenerator = require('./tokenGenerator');

const validateUser = (email, password, displayName) => {
  const errorName = nameValidation(displayName);
  const errorEmail = emailValidation(email);
  const errorPass = passwordValidation(password);
  if (errorName) return errorName;
  if (errorEmail) return errorEmail;
  if (errorPass) return errorPass;

  return null;
};

const createUsers = async (body) => {
  const { email, password, displayName } = body;
  const error = validateUser(email, password, displayName);
  if (error) return { code: 400, data: { message: error } };

  const alreadyExists = await User.findOne({ where: { email } });
  if (alreadyExists) return { code: 409, data: { message: 'User already registered' } };

  const newUser = await User.create({ ...body });
  const token = jwtGenerator(newUser);

  return { code: 201, data: { token } };
};

const findUsers = async () => {
  const findAll = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { code: 200, data: findAll };
};

const findUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return { code: 404, data: { message: 'User does not exist' } };

  return { code: 200, data: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { code: 204 };
};

module.exports = {
  createUsers,
  findUsers,
  findUser,
  deleteUser,
};