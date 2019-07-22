var Product = require('./api/products.js');
var CombinedProduct = require('./api/combinedProducts');

function Salad(options) {
  this.TYPE_CESAR = new Product(100, 20, 'cesar');
  this.TYPE_OLIVIER = new Product(50, 80, 'olivier');
  // this.name для удобного поиска в заказе
  this.name = options;
  this.type =
    options.type === this.TYPE_CESAR.name ? this.TYPE_CESAR : this.TYPE_OLIVIER;
  // наследует от CombinedProduct для подсчета совокупных калорий и цены
  CombinedProduct.call(this, this.type);
}

Salad.prototype = Object.create(CombinedProduct.prototype);

module.exports = Salad;
