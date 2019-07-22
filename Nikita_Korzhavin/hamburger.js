<<<<<<< HEAD
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
=======
var product = require('./products.js');

function hamburger (size, stiffing) {
    this.SIZE_SMALL = new product(50, 20);
    this.SIZE_LARGE = new product(100, 40);
    this.STUFFING_CHEESE = new product(10, 20);
    this.STUFFING_SALAD = new product(20, 5);
    this.STUFFING_POTATO = new product(15, 10);
    this.size = size;
    this.stiffing = stiffing;

    product.call(this);
}

hamburger.prototype = Object.create(product.prototype);
>>>>>>> 9a5e0f6363438461f06cebf0527aaa88ced8c050
