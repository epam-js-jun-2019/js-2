// Class Order
function Order(customer) {
  this.customer = customer || 'Officiant :)';
  this.positions = [];
}

// Order methods
Order.prototype.addToOrder = function(position) {
  return this.positions.push(position);
};
Order.prototype.deleteFromOrder = function(position) {
  return (this.positions = this.positions.filter(function(posToKeep) {
    return posToKeep !== position;
  }));
};
// item should be a string: ex. 'size', 'stuffing', 'type'
Order.prototype.showPositions = function(item) {
  return this.positions.map(function(pos) {
    return pos[item];
  });
};
Order.prototype.getTotalPrice = function() {
  return `Price is ${this.positions.reduce(function(sum, position) {
    return sum + position.getPrice();
  }, 0)} tugrics`;
};
Order.prototype.getTotalCalories = function() {
  return `Provides ${this.positions.reduce(function(sum, position) {
    return sum + position.getCalories();
  }, 0)} calories`;
};

// Class Hamburger
function Hamburger(size, stuffing) {
  this.size = size || '';
  this.stuffing = stuffing || '';
}

// Hamburger methods
Hamburger.prototype.chooseSize = function(size) {
  return size === Hamburger.SIZE_LARGE.type
    ? (this.size = Hamburger.SIZE_LARGE)
    : size === Hamburger.SIZE_SMALL.type
    ? (this.size = Hamburger.SIZE_SMALL)
    : size == undefined
    ? (this.size = '')
    : (this.size = "We don't have such!");
};
Hamburger.prototype.chooseStuffing = function(stuffing) {
  return stuffing === Hamburger.STUFFING_CHEESE.type
    ? (this.stuffing = Hamburger.STUFFING_CHEESE)
    : stuffing === Hamburger.STUFFING_SALAD.type
    ? (this.stuffing = Hamburger.STUFFING_SALAD)
    : stuffing === Hamburger.STUFFING_POTATO.type
    ? (this.stuffing = Hamburger.STUFFING_POTATO)
    : stuffing == undefined
    ? (this.stuffing = '')
    : (this.stuffing = "We don't have such!");
};
Hamburger.prototype.getSize = function() {
  return `Size is ${this.size.type}`;
};
Hamburger.prototype.getStuffing = function() {
  return `${this.stuffing.type} stuffing`;
};
Hamburger.prototype.getPrice = function() {
  return this.size.tugric + this.stuffing.tugric;
};
Hamburger.prototype.getCalories = function() {
  return this.size.calories + this.stuffing.calories;
};

// Constant vars
Hamburger.SIZE_SMALL = { type: 'Small', tugric: 50, calories: 20 };
Hamburger.SIZE_LARGE = { type: 'Large', tugric: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { type: 'Cheese', tugric: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { type: 'Salad', tugric: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { type: 'Potato', tugric: 15, calories: 10 };

var myOrder = new Order('Tigran');

var hamb = new Hamburger();
hamb.chooseSize('Large');
hamb.chooseStuffing('Cheese');

var hamb2 = new Hamburger();
hamb2.chooseSize('Small');
hamb2.chooseStuffing('Potato');

myOrder.addToOrder(hamb);
myOrder.addToOrder(hamb2);

console.table(myOrder.showPositions('size'));
console.table(myOrder.showPositions('stuffing'));
console.log(myOrder.getTotalPrice());
console.log(myOrder.getTotalCalories());
