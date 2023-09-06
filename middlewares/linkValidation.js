const validator = require('validator');

module.exports = (URL) => {
  if (validator.isURL(URL)) {
    return true;
  }
  return false;
};
