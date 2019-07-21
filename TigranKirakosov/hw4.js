// Class Order
function Order(customer) {
  this.customer = customer || 'Officiant :)';
  this.positions = [];
}

// Order methods
Order.prototype.addToOrder = function() {
  var args = Array.prototype.slice.call(arguments);
  for (let arg of args) {
    this.positions.push(arg);
  }
};
Order.prototype.deleteFromOrder = function(position) {
  return (this.positions = this.positions.filter(function(posToKeep) {
    return posToKeep !== position;
  }));
};
// item should be a string: ex. 'size', 'stuffing', 'type'
Order.prototype.showPositions = function() {
  return this.positions
    .map(function(position) {
      return position.foodType;
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

// Class Food
function Food(foodType) {
  this.foodType = foodType;
}

// Class Hamburger
function Hamburger(foodType, size, stuffing) {
  Food.call(this, foodType, size, stuffing);
  this.size = size;
  this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Food.prototype);

// Hamburger constant vars
Hamburger.SIZES = [
  { type: 'Small', tugric: 50, calories: 20 },
  { type: 'Large', tugric: 100, calories: 40 }
];
Hamburger.STUFFINGS = [
  { type: 'Cheese', tugric: 10, calories: 20 },
  { type: 'Salad', tugric: 20, calories: 5 },
  { type: 'Potato', tugric: 15, calories: 10 }
];

// Hamburger methods
Hamburger.prototype.chooseSize = function(type) {
  return (this.size = Hamburger.SIZES.filter(function(size) {
    return size.type === type;
  })[0]);
};
Hamburger.prototype.chooseStuffing = function(type) {
  return (this.stuffing = Hamburger.STUFFINGS.filter(function(stuffing) {
    return stuffing.type === type;
  })[0]);
};
Hamburger.prototype.showSizeType = function() {
  return `${this.size.type} size`;
};
Hamburger.prototype.showStuffingType = function() {
  return `${this.stuffing.type} stuffing`;
};
Hamburger.prototype.showPrice = function() {
  return this.size.tugric + this.stuffing.tugric;
};
Hamburger.prototype.showCalories = function() {
  return this.size.calories + this.stuffing.calories;
};

// Class Salad
function Salad(foodType) {
  Food.call(this, foodType);
  this.typeOfSalad;
}
Salad.prototype = Object.create(Food.prototype);

// Salad constant vars
Salad.TYPES = [
  { type: 'Caesar', tugric: 100, calories: 20 },
  { type: 'Olivier', tugric: 50, calories: 80 }
];

// Salad methods
Salad.prototype.chooseType = function(type) {
  return (this.typeOfSalad = Salad.TYPES.filter(function(salad) {
    return salad.type === type;
  })[0]);
};
Salad.prototype.showType = function() {
  return `It is ${this.typeOfSalad.type} salad`;
};
Salad.prototype.showPrice = function() {
  return this.typeOfSalad.tugric;
};
Salad.prototype.showCalories = function() {
  return this.typeOfSalad.calories;
};

// Class Drink
function Drink(foodType) {
  Food.call(this, foodType);
  this.typeOfDrink;
}
Drink.prototype = Object.create(Food.prototype);

// Drink constant vars
Drink.TYPES = [
  { type: 'Cola', tugric: 50, calories: 40 },
  { type: 'Coffee', tugric: 80, calories: 20 }
];

// Drink methods
Drink.prototype.chooseType = function(type) {
  return (this.typeOfDrink = Drink.TYPES.filter(function(drink) {
    return drink.type === type;
  })[0]);
};
Drink.prototype.showType = function() {
  return `It is ${this.typeOfDrink.type}`;
};
Drink.prototype.showPrice = function() {
  return this.typeOfDrink.tugric;
};
Drink.prototype.showCalories = function() {
  return this.typeOfDrink.calories;
};

/* 
#                   Order Interface
##
### addToOrder()        || Add multiple items
### deleteFromOrder()   || Delete a certain item
### showPositions()     || Show positions by its type
### calcTotalPrice()    || Show total price of an order
### calcTotalCalories() || Show total calories an order provides
##
#                   Food Interface
##
### chooseSize()        || Sets size type (Hamburger)
### showSizeType()      || Shows size type (Hamburger)
### chooseStuffing()    || Sets stuffing type (Hamburger)
### showStuffingType()  || Shows stuffing type (Hamburger)
### chooseType()        || Sets type (All except Hamburger)
### showType()          || Shows type (All except Hamburger)
### showPrice()         || Shows price (All)
### showCalories()      || Shows calories (All)
##
# 
*/

// Instantiating objects
var myOrder = new Order('Tigran');
var myHamb = new Hamburger('Hamburger');
var mySalad = new Salad('Salad');
var myDrink = new Drink('Drink');

// Configurating food properties
myHamb.chooseSize('Large'); // 'Large' or 'Small'
myHamb.chooseStuffing('Potato'); // 'Cheese', 'Salad' or 'Potato'
mySalad.chooseType('Olivier'); // 'Caesar' or 'Olivier'
myDrink.chooseType('Cola'); // 'Coffee' or 'Cola'

// Adding items to the order
myOrder.addToOrder(myHamb, mySalad, myDrink);
// Deleting item from the order
myOrder.deleteFromOrder();
console.log(myOrder.showPositions());
