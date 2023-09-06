const { ERROR_FORBIDDEN } = require('./errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
