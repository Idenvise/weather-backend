const { ERROR_VALIDATION } = require('./errors');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_VALIDATION;
  }
}

module.exports = ValidationError;
