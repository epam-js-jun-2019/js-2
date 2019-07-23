var Cart = require('./Cart');

function Order() {
  this.cart = new Cart();
  this.total = 0;
  this.calories = 0;
  this.currency = "tg";
}

Order.prototype.add = function(className, options) {
  var product = new className(options);
  var quantity = options.quantity || 1;
  this.cart.add(product, quantity);
  return this;
}

Order.prototype.remove = function(className, options) {
  this.cart.remove(className, options);
  return this;
}

Order.prototype.checkout = function() {
  this.cart.checkout();
  this.total = this.cart.getTotal();
  this.calories = this.cart.getCalories();
  return this;
}

Order.prototype.printReceipt = function() {
  var n = "\n";
  var sp = "-----------------------------";
  var receipt = "Your order:" + n + sp + n + this.cart.getProductsList(this.currency) + n + sp + n + "Callories: " + this.calories + n + "Total: " + this.total + " " + this.currency;
  console.log(receipt);
}

module.exports = Order;