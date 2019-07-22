var Product = require('./api/products.js');
var CombinedProduct = require('./api/combinedProducts');

function Hamburger(options) {
  this.SIZE_SMALL = new Product(50, 20, 'small');
  this.SIZE_LARGE = new Product(100, 40, 'large');
  this.STUFFING_CHEESE = new Product(10, 20, 'cheese');
  this.STUFFING_SALAD = new Product(20, 5, 'salad');
  this.STUFFING_POTATO = new Product(15, 10, 'potato');
  // this.name для удобного поиска в заказе
  this.name = options;
  this.size =
    options.size === this.SIZE_SMALL.name ? this.SIZE_SMALL : this.SIZE_LARGE;
  this.stuffing =
    options.stuffing === this.STUFFING_CHEESE.name
      ? this.STUFFING_CHEESE
      : this.STUFFING_SALAD.name
      ? this.STUFFING_SALAD
      : this.STUFFING_POTATO;
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
