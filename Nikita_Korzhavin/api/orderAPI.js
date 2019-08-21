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

module.exports = {
  arrayWithDeletedProduct: arrayWithDeletedProduct,
  arrayWithAddedProduct: arrayWithAddedProduct,
}

