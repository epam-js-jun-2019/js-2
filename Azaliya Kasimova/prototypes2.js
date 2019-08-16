// FOOD

function Food(params) {
  this.type = params.type;
}

Food.prototype.getName = function() {
  return this.constructor.name + " " + this.type;
}

Food.prototype.getPrice = function() {
  return this.constructor[this.type][0];
}

Food.prototype.getCalories = function() {
  return this.constructor[this.type][1];
}

// HAMBURGER

function Hamburger(params) {
  Food.call(this, params);
  this.size = params.size;
  this.stuffing = params.stuffing;
}

Hamburger.prototype = Object.create(Food.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getName = function() {
  return "Hamburger " + this.size + " with " + this.stuffing;
}
Hamburger.prototype.getPrice = function() {
  return Hamburger[this.size][0] + Hamburger[this.stuffing][0];
};

Hamburger.prototype.getCalories = function() {
  return Hamburger[this.size][1] + Hamburger[this.stuffing][1];
};

// [price, calories]
Hamburger.SIZE_SMALL = [50, 20];
Hamburger.SIZE_LARGE = [100, 40];
Hamburger.STUFFING_CHEESE = [10, 20];
Hamburger.STUFFING_SALAD = [20, 5];
Hamburger.STUFFING_POTATO = [15, 10];

// SALAD

function Salad (params) {
  Food.call(this, params);
  this.weight = params.weight;
}

Salad.prototype = Object.create(Food.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.getPrice = function() {
  return Salad[this.type][0] * this.weight/100;
};

Salad.prototype.getCalories = function() {
  return Salad[this.type][1] * this.weight/100;
};

// [price, calories] for 100g weight
Salad.CESAR = [100, 20];
Salad.OLIVYE = [50, 80];

// DRINK

function Drink (params) {
  Food.call(this, params);
}

Drink.prototype = Object.create(Food.prototype);
Drink.prototype.constructor = Drink;

// [price, calories]
Drink.COLA = [50, 40];
Drink.COFFEE = [80, 20];

/// ORDER

function Order () {
  this.foods = [];
}

// add food to menu
Order.prototype.addFood = function(foodClass, foodParams) {
  var food = new foodClass(foodParams);
  var count = foodParams.count || 1;
  this.foods.push( [ food, count] );  
}

// remove food from menu
Order.prototype.removeFood =  function(foodClass, foodParams) {  
  var excessFood = new foodClass(foodParams);
  var excessFoodName = excessFood.getName();  
  this.foods = this.foods.filter(function(value) {
    return value[0].getName() != excessFoodName;
  });
}

// get total price
Order.prototype.getTotalPrice = function() {
  return this.foods.reduce(function(accum, value) {
    return accum + value[0].getPrice() * value[1];
  }, 0);
}

// get total calories
Order.prototype.getTotalCalories = function() {
  return this.foods.reduce(function(accum, value) {
    return accum + value[0].getCalories() * value[1];
  }, 0);
}

// freeze order from adding and removing
Order.prototype.freezeOrder = function() {
  Object.freeze(this.foods);
}

var order = new Order();

order.addFood(Hamburger, { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE' });
order.addFood(Hamburger, { size: 'SIZE_LARGE', stuffing: 'STUFFING_POTATO', count: 2 });
order.addFood(Salad, { type: 'CESAR', weight: 250, count: 1 })
order.addFood(Salad, { type: 'OLIVYE', weight: 150, count: 1 })
order.addFood(Drink, { type: 'COFFEE'});

order.removeFood(Salad, { type: 'CESAR' });
order.removeFood(Hamburger, { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE' });
order.removeFood(Drink, { type: 'COLA'});

console.log(order);
console.log(order.getTotalPrice());
console.log(order.getTotalCalories());

// замораживаем заказ
//order.freezeOrder();
// проверка
//order.addFood(Drink, { type: 'COLA' });