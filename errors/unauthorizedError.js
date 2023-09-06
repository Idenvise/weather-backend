const { ERROR_UNAUTHORIZED } = require('./errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
