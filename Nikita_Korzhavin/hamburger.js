var defineProperty = require('./api/productConstructor.js');
var CombinedProduct = require('./api/combinedProducts');

function Hamburger(options) {
  this.SIZE_SMALL = { price: 50, calories: 20, name: 'small' };
  this.SIZE_LARGE = { price: 100, calories: 40, name: 'large' };
  this.STUFFING_CHEESE = { price: 10, calories: 20, name: 'cheese' };
  this.STUFFING_SALAD = { price: 20, calories: 5, name: 'salad' };
  this.STUFFING_POTATO = { price: 15, calories: 10, name: 'potato' };
  // this.name для удобного поиска в заказе
  var constantsList = [
    this.SIZE_SMALL,
    this.SIZE_LARGE,
    this.STUFFING_CHEESE,
    this.STUFFING_SALAD,
    this.STUFFING_POTATO,
  ];
  this.name = options;

  this.size = defineProperty(constantsList, options.size);
  this.stuffing = defineProperty(constantsList, options.stuffing);

  // наследует от CombinedProduct для подсчета совокупных калорий и цены
  CombinedProduct.call(this, this.size, this.stuffing);
}

Hamburger.prototype = Object.create(CombinedProduct.prototype);

Hamburger.prototype.getSize = function() {
  return this.size.name;
};
Hamburger.prototype.getStuffing = function() {
  return this.stuffing.name;
};

module.exports = Hamburger;
