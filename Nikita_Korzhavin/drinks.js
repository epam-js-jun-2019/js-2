var defineProperty = require('./api/productConstructor.js');
var CombinedProduct = require('./api/combinedProducts');

function Drink(options) {
  this.TYPE_COKE = { price: 50, calories: 40, name: 'coke' };
  this.TYPE_COFFEE = { price: 80, calories: 20, name: 'coffee' };
  var constantsList = [this.TYPE_COKE, this.TYPE_COFFEE];
  // this.name для удобного поиска в заказе
  this.name = options;
  this.type = defineProperty(constantsList, options.type);
  // наследует от CombinedProduct для подсчета совокупных калорий и цены
  CombinedProduct.call(this, this.type);
}

Drink.prototype = Object.create(CombinedProduct.prototype);

module.exports = Drink;
