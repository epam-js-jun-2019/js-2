function Hamburger(options) {
  this.size = options.size;
  this.stuffing = options.stuffing;
}
Hamburger.prototype.getPrice = function() {
  return Hamburger[this.size].price + Hamburger[this.stuffing].price;
};
Hamburger.prototype.getCalories = function() {
  return Hamburger[this.size].cal + Hamburger[this.stuffing].cal;
};

Hamburger.SIZE_SMALL = { price: 50, cal: 20 };
Hamburger.SIZE_LARGE = { price: 100, cal: 40 };
Hamburger.STUFFING_CHEESE = { price: 10, cal: 20 };
Hamburger.STUFFING_SALAD = { price: 20, cal: 5 };
Hamburger.STUFFING_POTATO = { price: 15, cal: 10 };

module.exports = Hamburger;