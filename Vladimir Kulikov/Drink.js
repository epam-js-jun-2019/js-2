var Product = require('./Product');

function Drink(options) {
  Product.call(this, options);
}

Drink.prototype = Object.create(Product.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = { price: 50, cal: 40 };
Drink.COFFEE = { price: 80, cal: 20 };

module.exports = Drink;