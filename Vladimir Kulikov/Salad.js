var Product = require('./Product');

function Salad(options) {
  Product.call(this, options);
}

Salad.prototype = Object.create(Product.prototype);
Salad.prototype.constructor = Salad;

Salad.CESAR = { price: 100, cal: 20 };
Salad.OLIVIE = { price: 50, cal: 80 };

module.exports = Salad;