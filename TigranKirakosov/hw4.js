'use strict';
// Class Order
function Order(customer) {
  this.customer = customer || 'Officiant :)';
  this.positions = [];
}

// Order methods
Order.prototype.addToOrder = function() {
  for (var i = 0; i < arguments.length; i++) {
    this.positions.push(arguments[i]);
  }
};
Order.prototype.deleteFromOrder = function(position) {
  return (this.positions = this.positions.filter(function(posToKeep) {
    return posToKeep !== position;
  }));
};
Order.prototype.showPositions = function() {
  return this.positions
    .map(function(position) {
      return position.description;
    })
    .join(', ');
};
Order.prototype.calcTotalPrice = function() {
  return `Price is ${this.positions.reduce(function(sum, position) {
    return sum + position.showPrice();
  }, 0)} tugrics`;
};
Order.prototype.calcTotalCalories = function() {
  return `Provides ${this.positions.reduce(function(sum, position) {
    return sum + position.showCalories();
  }, 0)} calories`;
};
Order.prototype.makePayment = function() {
  return Object.freeze(this), Object.freeze(this.positions);
};

// Class Food
function Food(description) {
  this.description = description || 'Nameless position';
  this.typeOfFood;
  this.size;
  this.addition;
}

// Food methods
Food.prototype.chooseType = function(type, menu) {
  return (this.typeOfFood = menu.filter(function(food) {
    return food.type === type;
  })[0]);
};
Food.prototype.chooseSize = function(type, menu) {
  return (this.size = menu.filter(function(size) {
    return size.type === type;
  })[0]);
};
Food.prototype.chooseAddition = function(type, menu) {
  return (this.addition = menu.filter(function(addition) {
    return addition.type === type;
  })[0]);
};
Food.prototype.showAddition = function() {
  return `${this.addition.type} addition`;
};
Food.prototype.showPrice = function() {
  return this.typeOfFood.tugric;
};
Food.prototype.showCalories = function() {
  return this.typeOfFood.calories;
};
Food.prototype.showType = function() {
  return `It is ${this.typeOfFood.type}`;
};
Food.prototype.showSize = function() {
  return `${this.size.type} size`;
};

// Class Hamburger
function Hamburger(description) {
  Food.call(this, description);
}
Hamburger.prototype = Object.create(Food.prototype);

// Hamburger constant vars
Hamburger.SIZES = [
  { type: 'Small', tugric: 50, calories: 20 },
  { type: 'Large', tugric: 100, calories: 40 }
];
Hamburger.ADDITIONS = [
  { type: 'Cheese', tugric: 10, calories: 20 },
  { type: 'Salad', tugric: 20, calories: 5 },
  { type: 'Potato', tugric: 15, calories: 10 }
];

// Hamburger methods
Hamburger.prototype.showPrice = function() {
  return this.size.tugric + this.addition.tugric;
};
Hamburger.prototype.showCalories = function() {
  return this.size.calories + this.addition.calories;
};

// Class Salad
function Salad(description) {
  Food.call(this, description);
}
Salad.prototype = Object.create(Food.prototype);

// Salad constant vars
Salad.MENU = [
  { type: 'Caesar', tugric: 100, calories: 20 },
  { type: 'Olivier', tugric: 50, calories: 80 }
];

// Class Drink
function Drink(description) {
  Food.call(this, description);
}
Drink.prototype = Object.create(Food.prototype);

// Drink constant vars
Drink.MENU = [
  { type: 'Cola', tugric: 50, calories: 40 },
  { type: 'Coffee', tugric: 80, calories: 20 }
];

/* 
#                           Order Interface
##
### addToOrder(arg1, arg2, ...)   || Add multiple items
### deleteFromOrder(position)     || Delete certain position
### showPositions()               || Show positions by its type
### calcTotalPrice()              || Show total price of an order
### calcTotalCalories()           || Show total calories an order provides
### makePayment()                 || Pay an order and make it immutable
##
#                           Food Interface
##
### chooseAddition(type, menu)    || Sets addition from menu
### chooseType(type, menu)        || Sets type from menu
### chooseSize(type, menu)        || Sets size from menu
### showSize()                    || Shows size type
### showAddition()                || Shows addition type
### showType()                    || Shows type
### showPrice()                   || Shows price
### showCalories()                || Shows calories
##
# 
*/

// Instantiating objects
var myOrder = new Order('Tigran');
var myHamb = new Hamburger('Hamburger');
var mySalad = new Salad('Olivier salad');
var myDrink = new Drink('Cola');

// Configurating food properties
myHamb.chooseSize('Large', Hamburger.SIZES); // 'Large' or 'Small'
myHamb.chooseAddition('Potato', Hamburger.ADDITIONS); // 'Cheese', 'Salad' or 'Potato'
mySalad.chooseType('Olivier', Salad.MENU); // 'Caesar' or 'Olivier'
myDrink.chooseType('Cola', Drink.MENU); // 'Coffee' or 'Cola'

// Adding items to the order
myOrder.addToOrder(myHamb, myDrink, mySalad);
// Deleting item from the order
// myOrder.deleteFromOrder(mySalad);

// Make payment
// myOrder.makePayment();

console.log(myOrder.calcTotalPrice());
