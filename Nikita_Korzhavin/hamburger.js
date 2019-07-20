var product = require('./products.js');

function hamburger (size, stiffing) {
    this.SIZE_SMALL = new product(50, 20);
    this.SIZE_LARGE = new product(100, 40);
    this.STUFFING_CHEESE = new product(10, 20);
    this.STUFFING_SALAD = new product(20, 5);
    this.STUFFING_POTATO = new product(15, 10);
    this.size = size;
    this.stiffing = stiffing;

    product.call(this);
}

hamburger.prototype = Object.create(product.prototype);
