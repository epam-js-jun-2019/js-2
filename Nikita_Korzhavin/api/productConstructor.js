var Product = require('./products.js');

function getNeededConstant(constants, name) {
  return constants.reduce(function(acc, current) {
    return current.name === name ? current : acc;
  });
}

function defineProperty(constants, name) {
  return new Product(getNeededConstant(constants, name));
}

module.exports = defineProperty;
