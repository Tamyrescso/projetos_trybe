const errorMessage = {
  titleRequired: '"title" is required',
  contentRequired: '"content" is required',
  categoryIdRequired: '"categoryIds" is required',
  categoryNotEdited: 'Categories cannot be edited',
};

const isNotExistent = (value) => value === undefined;

const titleValidation = (title) => {
  if (isNotExistent(title)) return errorMessage.titleRequired;
};

const contentValidation = (content) => {
  if (isNotExistent(content)) return errorMessage.contentRequired;
};

const categoryIdValidation = (categoryId) => {
  if (isNotExistent(categoryId)) return errorMessage.categoryIdRequired;
};

const cannotEditCategories = (body) => {
  if (body.categoryIds) return errorMessage.categoryNotEdited;
};

module.exports = { titleValidation,
  contentValidation,
  categoryIdValidation,
  cannotEditCategories,
};