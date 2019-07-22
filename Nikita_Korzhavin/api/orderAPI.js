var ProductFactory = require('./productFactory.js');

// просто вынесенные функции из order.js
function isNeededObject(options, obj) {
  return Object.keys(options).every(function(key) {
    return options[key] === obj[key];
  });
}

function arrayWithDeletedProduct(arr, options) {
  var objectIndex = arr.reduce(function(acc, curr, index) {
    return isNeededObject(options, curr.name) ? index : acc;
  }, -1);
  if (objectIndex !== -1) {
    arr.splice(objectIndex, 1);
  }
  return arr;
}

function arrayWithAddedProduct(arr, options) {
  var productFactory = new ProductFactory();
  arr.push(productFactory.newProduct(options));
  return arr;
}

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

exports.arrayWithDeletedProduct = arrayWithDeletedProduct;
exports.arrayWithAddedProduct = arrayWithAddedProduct;
exports.calculateOrderPrice = calculateOrderPrice;
exports.calculateOrderCalories = calculateOrderCalories;
exports.paidOrder = paidOrder;
