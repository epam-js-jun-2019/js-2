function Cart() {
  this.cart = [];
}

Cart.prototype.add = function(product, quantity) {
  try {
    this.cart.push([product, quantity]);
    return this;
  } catch(e) {
    console.log('You cannot add produts after checkout. Please create new order.');
  }
}

Cart.prototype.remove = function(className, options) {
  var cart = this;
  var removeQuantity = options.quantity || 1;

  this.cart = this.cart.reduce(function(acc, cartItem) {
    var product = cartItem[0];
    var currentQuantity = cartItem[1];

    if (product instanceof className) {
      if (cart.inCart(product, options)) {
        var newQuantity = currentQuantity - removeQuantity;
        if (newQuantity > 0) {
          acc.push([product, newQuantity]);
        }
      }
    } else {
      acc.push(cartItem);
    }

    return acc;
  }, []);
}

Cart.prototype.inCart = function (product, options) {
  var diff = Object.keys(product).reduce(function(acc, key) {
    if (key !== 'quantity') {
      return product[key] === options[key] ? acc : acc += 1;
    }
    return acc;
  }, 0);
  return diff === 0 ? true : false;
}

Cart.prototype.getTotal = function() {
  return this.cart.reduce(function(acc, cartItem) {
    var product = cartItem[0];
    var quantity = cartItem[1];
    return acc += product.getPrice() * quantity;
  }, 0);
}

Cart.prototype.getCalories = function() {
  return this.cart.reduce(function(acc, cartItem) {
    var product = cartItem[0];
    var quantity = cartItem[1];
    return acc += product.getCalories() * quantity;
  }, 0);
}

Cart.prototype.checkout = function() {
  Object.freeze(this.cart);
}

Cart.prototype.getProductsList = function(currency) {
  return this.cart.reduce(function(acc, cartItem) {
    var product = cartItem[0];
    var quantity = cartItem[1];
    var productOptions = Object.keys(product)
      .map(function(key) { return product[key] })
      .join(', ');
    var newAcc = acc + product.constructor.name + " (" + productOptions + ") ..... " + quantity + " x " + product.getPrice() + " " + currency + "\n";
    return newAcc;
  }, "");
}

module.exports = Cart;