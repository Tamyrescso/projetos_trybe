const { User } = require('../models');
const { emailValidation, passwordValidation } = require('../schema/userValidation');
const jwtGenerator = require('./tokenGenerator');

const userLogin = async (body) => {
  const { email, password } = body;
  const errorEmail = emailValidation(email);
  const errorPass = passwordValidation(password);
  if (errorPass || errorEmail) return { code: 400, data: { message: errorPass || errorEmail } };

  const user = await User.findOne({ where: { email } });
  if (!user) return { code: 400, data: { message: 'Invalid fields' } };

  const token = jwtGenerator({ id: user.id, email });

  return { code: 200, data: { token } };
};

module.exports = {
  userLogin,
};