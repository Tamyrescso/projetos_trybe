const {
  findPosts,
  findPost,
  createPosts,
  updatePost,
  deletePost, 
  findPostsByQuery } = require('../services/postServices');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const createPost = await createPosts(title, content, categoryIds, id);

    const { code, data } = createPost;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getPosts = async (_req, res, next) => {
  try {
    const findAllPosts = await findPosts();

    const { code, data } = findAllPosts;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findPost(id);

    const { code, data } = user;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const updated = await updatePost(req.body, id, userId);

    const { code, data } = updated;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const destroyPost = await deletePost(id, userId);

    const { code, data } = destroyPost;
    if (code === 204) return res.status(code).end();

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const findByQuery = async (req, res, next) => {
  try {
    let result = {};
    if (!req.query.q.length) {
      result = await findPosts();
    } else {
      result = await findPostsByQuery(req.query);
    }

    const { code, data } = result;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getPosts,
  getPostById,
  update,
  destroy,
  findByQuery,
};