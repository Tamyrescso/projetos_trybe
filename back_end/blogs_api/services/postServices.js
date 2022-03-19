const { BlogPost, User, Category, PostsCategories } = require('../models');
const { titleValidation,
  contentValidation,
  categoryIdValidation,
  cannotEditCategories } = require('../schema/postValidation');

const createPosts = async (title, content, categoryIds, userId) => {
  const validations = [
    titleValidation(title),
    contentValidation(content),
    categoryIdValidation(categoryIds),
  ];
  for (let i = 0; i < validations.length; i += 1) {
    if (validations[i]) return { code: 400, data: { message: validations[i] } };
  }

  const categories = await Category.findAll();
  const categoriesIds = categories.map(({ id }) => id);

  const allCategoriesIdExist = categoryIds.every((id) => categoriesIds.includes(id));
  if (!allCategoriesIdExist) return { code: 400, data: { message: '"categoryIds" not found' } };

  const newPost = await BlogPost.create({ title, content, userId });
  const { dataValues } = newPost;

  await Promise.all(categoryIds.map(
      (category) => PostsCategories.create({ categoryId: category, postId: newPost.id }),
));

  return { code: 201, data: dataValues };
};

const findPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
  ],
  });

  return { code: 200, data: posts };
};

const findPost = async (value) => {
  const whereClause = typeof value === 'object' ? value : { id: value };
  const post = await BlogPost.findOne({ where: whereClause,
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
  ],
  });

  if (!post) return { code: 404, data: { message: 'Post does not exist' } };

  return { code: 200, data: post };
};

const findPostsByQuery = async (query) => {
  const { q } = query;
  const findByTitle = await findPost({ title: q });
  const findByContent = await findPost({ content: q });

  if (findByTitle.code === 404 && findByContent.code === 404) return { code: 200, data: [] };

  if (findByTitle.code !== 404) return { code: findByTitle.code, data: [findByTitle.data] };
  if (findByContent) return { code: findByContent.code, data: [findByContent.data] };
};

const updateValidation = async (body, id, userId) => {
  const posts = await BlogPost.findByPk(id);
  if (userId !== posts.userId) return { code: 401, data: { message: 'Unauthorized user' } };
  
  const { title, content } = body;
  const validations = [
    titleValidation(title),
    contentValidation(content),
    cannotEditCategories(body),
  ];
  for (let i = 0; i < validations.length; i += 1) {
    if (validations[i]) return { code: 400, data: { message: validations[i] } };
  }
};

const updatePost = async (body, id, userId) => {
  const error = await updateValidation(body, id, userId);
  if (error) return error;

  const { title, content } = body;
  await BlogPost.update({ title, content }, { where: { id } });

  const post = await BlogPost.findOne({ where: { id },
    attributes: ['title', 'content', 'userId'],
    include: [
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
  ],
  });

  return { code: 200, data: post };
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { code: 404, data: { message: 'Post does not exist' } };
  if (userId !== post.userId) return { code: 401, data: { message: 'Unauthorized user' } };

  await BlogPost.destroy({ where: { id } });

  return { code: 204, data: {} };
};

module.exports = {
  createPosts,
  findPosts,
  findPost,
  updatePost,
  deletePost,
  findPostsByQuery,
};