var Product = require('./api/products.js');
var CombinedProduct = require('./api/combinedProducts');

function Drink(options) {
  this.TYPE_COKE = new Product(50, 40, 'coke');
  this.TYPE_COFFEE = new Product(80, 20, 'coffee');

  // this.name для удобного поиска в заказе
  this.name = options;

  this.type =
    options.type === this.TYPE_COKE.name ? this.TYPE_COKE : this.TYPE_COFFEE;
  // наследует от CombinedProduct для подсчета совокупных калорий и цены
  CombinedProduct.call(this, this.type);
}

Drink.prototype = Object.create(CombinedProduct.prototype);

module.exports = Drink;
