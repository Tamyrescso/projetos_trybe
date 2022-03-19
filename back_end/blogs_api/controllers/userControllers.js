const { createUsers, findUsers, findUser, deleteUser } = require('../services/userServices');

const create = async (req, res, next) => {
  try {
    const createUser = await createUsers(req.body);

    const { code, data } = createUser;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await findUsers();

    const { code, data } = users;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);

    const { code, data } = user;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
  const { id } = req.user;
  const deletedUser = await deleteUser(id);

  const { code } = deletedUser;
  return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getUsers,
  getUserById,
  destroy,
};