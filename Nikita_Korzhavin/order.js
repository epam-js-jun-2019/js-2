var ord = require('./api/orderAPI');

function Order() {
  this.products = [];
  this.paid = false;
}

Order.prototype.addProduct = function(options) {
  this.products = ord.arrayWithAddedProduct(this.products, options);
};

Order.prototype.deleteProduct = function(options) {
  this.products = ord.arrayWithDeletedProduct(this.products, options);
};

Order.prototype.calculatePrice = function() {
  return ord.calculateOrderPrice(this.products);
};

Order.prototype.calculateCalories = function() {
  return ord.calculateOrderCalories(this.products);
};

Order.prototype.pay = function(money) {
  // проверяем, достаточно ли заплатили денег, если да, то заказ делаем оплаченным и фризим массив с товарами
  this.paid = money >= this.calculatePrice() ? true : false;
  this.products = this.paid ? ord.paidOrder(this.products) : this.products;
};

module.exports = Order;
