const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
  windowMs: 5000,
  max: 5,
});
