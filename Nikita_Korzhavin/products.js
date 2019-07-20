function product(price, calories) {
  this.price = price || 0;
  this.calories = calories || 0;
  
}

product.prototype.calculatePrice = function() {
  return this.price;
};

product.prototype.calculateCalories = function() {
  return this.calories;
};

module.exports = product;
/*
var product1 = new product(122, 2323);

console.log(product1);
console.log(product1.calculatePrice());
*/
