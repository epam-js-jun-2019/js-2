// product используются для моделирования начинок, типов салатов и напитков
function Product(options) {
  this.price = options.price || 0;
  this.calories = options.calories || 0;
  this.name = options.name || undefined;
}

Product.prototype.calculatePrice = function() {
  return this.price;
};

Product.prototype.calculateCalories = function() {
  return this.calories;
};

module.exports = Product;
