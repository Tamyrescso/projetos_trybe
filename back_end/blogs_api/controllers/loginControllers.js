const { userLogin } = require('../services/loginServices');

const login = async (req, res, next) => {
  try {
    const user = await userLogin(req.body);

    const { code, data } = user;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
};