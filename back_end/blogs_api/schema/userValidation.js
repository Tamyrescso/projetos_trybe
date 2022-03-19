const errorMessage = {
  nameLength: '"displayName" length must be at least 8 characters long',
  emailRequired: '"email" is required',
  emailValid: '"email" must be a valid email',
  passwordRequired: '"password" is required',
  passwordLength: '"password" length must be 6 characters long',
  emailEmpty: '"email" is not allowed to be empty',
  passwordEmpty: '"password" is not allowed to be empty',
};

const blank = (value) => !value.length;
const isNotExistent = (value) => value === undefined;
const regexMatch = (regex, value) => !regex.test(value);
const isNotEqual = (value, pattern) => value !== pattern;
const isLesserThan = (value, min) => value < min;

const nameValidation = (name) => {
  if (isNotExistent(name) || isLesserThan(name.length, 8)) {
    return errorMessage.nameLength;
  }
  return null;
};

const emailValidation = (email) => {
  switch (true) {
    case isNotExistent(email):
      return errorMessage.emailRequired;
    case blank(email):
      return errorMessage.emailEmpty;
    case regexMatch(/^.+@\w+(.com)$/, email):
      return errorMessage.emailValid;
    default:
      return null;
  }
};

const passwordValidation = (password) => {
  switch (true) {
    case isNotExistent(password):
      return errorMessage.passwordRequired;
    case blank(password):
      return errorMessage.passwordEmpty;
    case isNotEqual(password.length, 6):
      return errorMessage.passwordLength;
    default:
      return null;
  }
};

module.exports = { emailValidation, nameValidation, passwordValidation };