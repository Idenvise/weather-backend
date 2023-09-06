const { ERROR_NOTFOUND } = require('./errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOTFOUND;
  }
}

module.exports = NotFoundError;
