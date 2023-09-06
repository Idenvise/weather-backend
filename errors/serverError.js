const { ERROR_SERVER } = require('./errors');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_SERVER;
  }
}

module.exports = ServerError;
