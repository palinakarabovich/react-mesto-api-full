const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const handleAuthError = (next) => {
  next(new AuthError('Необходима авторизоваться'));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;
  return next();
};
