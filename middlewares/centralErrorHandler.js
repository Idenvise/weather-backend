const { ERROR_SERVER } = require('../errors/errors');

module.exports = ((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  res.status(statusCode).json({ message: statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : message });
  next();
});
