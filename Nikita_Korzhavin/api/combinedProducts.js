var { calculatePrice, calculateCalories } = require('./calculateSmthInArray');

function CombinedProduct() {
  // принимаем все объекты products (можно найти класс в products.js)
  // products используются для моделирования начинок, типов салатов и напитков
  this.productParts = Array.prototype.slice.call(arguments, 0);
}

CombinedProduct.prototype.calculatePrice = function() {
  return calculatePrice(this.productParts);
};

CombinedProduct.prototype.calculateCalories = function() {
  return calculateCalories(this.productParts);
};

module.exports = CombinedProduct;
