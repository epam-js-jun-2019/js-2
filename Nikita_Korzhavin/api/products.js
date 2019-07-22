// product используются для моделирования начинок, типов салатов и напитков
function Product(price, calories, name) {
  this.price = price || 0;
  this.calories = calories || 0;
  this.name = name;
}

Product.prototype.calculatePrice = function() {
  return this.price;
};

Product.prototype.calculateCalories = function() {
  return this.calories;
};

module.exports = Product;
