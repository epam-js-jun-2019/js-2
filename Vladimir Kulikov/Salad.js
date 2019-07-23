function Salad(options) {
  this.name = options.name;
}
Salad.prototype.getPrice = function() {
  return Salad[this.name].price;
};
Salad.prototype.getCalories = function() {
  return Salad[this.name].cal;
};

Salad.CESAR = { price: 100, cal: 20 };
Salad.OLIVIE = { price: 50, cal: 80 };

module.exports = Salad;