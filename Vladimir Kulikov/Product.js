function Product(options) {
  this.name = options.name;
}

Product.prototype.getPrice = function() {
  return this.constructor[this.name].price;
}

Product.prototype.getCalories = function() {
  return this.constructor[this.name].cal;
}

module.exports = Product;