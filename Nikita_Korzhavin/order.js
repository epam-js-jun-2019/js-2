var ord = require('./api/orderAPI');

function calculateOrderPrice(arr) {
  return arr.reduce(function(acc, prod) {
    return acc + prod.calculatePrice();
  }, 0);
}

function calculateOrderCalories(arr) {
  return arr.reduce(function(acc, prod) {
    return acc + prod.calculateCalories();
  }, 0);
}

function paidOrder(arr) {
  return Object.freeze(arr);
}



//--------------------------------------
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
  return calculateOrderPrice(this.products);
};

Order.prototype.calculateCalories = function() {
  return calculateOrderCalories(this.products);
};

Order.prototype.pay = function(money) {
  // проверяем, достаточно ли заплатили денег, если да, то заказ делаем оплаченным и фризим массив с товарами
  this.paid = money >= this.calculatePrice() ? true : false;
  this.products = this.paid ? paidOrder(this.products) : this.products;
};

module.exports = Order;
