var defineProperty = require('./api/productConstructor.js');
var CombinedProduct = require('./api/combinedProducts');

function Salad(options) {
  this.TYPE_CESAR = { price: 100, calories: 20, name: 'cesar' };
  this.TYPE_OLIVIER = { price: 50, calories: 80, name: 'olivier' };
  var constantsList = [this.TYPE_CESAR, this.TYPE_OLIVIER];
  // this.name для удобного поиска в заказе
  this.name = options;
  this.type = defineProperty(constantsList, options.type);

  // наследует от CombinedProduct для подсчета совокупных калорий и цены
  CombinedProduct.call(this, this.type);
}

Salad.prototype = Object.create(CombinedProduct.prototype);

module.exports = Salad;
