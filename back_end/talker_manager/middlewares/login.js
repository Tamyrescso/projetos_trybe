const crypto = require('crypto');
// Criação de token baseada no link https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript na resposta do usuário Mulan
// crypto é um módulo do node.js, a funçao randomBytes retorna em bufer o dobro do número especificado e a função toString converte para hexadecimal
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^.+@\w+(.com)$/;

  if (!email || !email.length) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.length) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const generateToken = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({
    token: `${token}`,
  });
};

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
};