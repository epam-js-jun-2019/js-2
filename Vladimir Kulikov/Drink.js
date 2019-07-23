function Drink(options) {
  this.name = options.name;
}
Drink.prototype.getPrice = function() {
  return Drink[this.name].price;
};
Drink.prototype.getCalories = function() {
  return Drink[this.name].cal;
};

Drink.COLA = { price: 50, cal: 40 };
Drink.COFFEE = { price: 80, cal: 20 };

module.exports = Drink;