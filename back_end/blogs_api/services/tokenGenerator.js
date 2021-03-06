const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '3d',
};

module.exports = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);
