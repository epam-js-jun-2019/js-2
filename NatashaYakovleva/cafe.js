// 
//----------------------- DISH-----------------------------------------------
// 

function Dish(price, calories) {
  this.price = price;
  this.calories = calories;
}

Dish.prototype.getPrice = function() {return this.price;}
Dish.prototype.getCalories = function() {return this.calories;}

// 
//----------------------- GAMBURGER------------------------------------------
// 

function Gamburger(size, price, calories, filling) {
  
  Dish.call(this, price, calories);
  this.size = size;
  this.filling = filling;
  
}

Gamburger.SMALL_SIZE = ["small", 50, 20];
Gamburger.BIG_SIZE = ["big", 100, 40];
Gamburger.FILLING_SHEESE = ["sheese", 10, 20];
Gamburger.FILLING_SALAD = ["salad", 20, 5];
Gamburger.FILLING_POTATO = ["potato", 15, 10];
Gamburger.prototype = Object.create(Dish.prototype);
Gamburger.prototype.constructor = Gamburger;
Gamburger.prototype.getSize = function() {return this.size;}
Gamburger.prototype.getFilling = function() {return this.filling;}


// 
// ------------------------SALAD-----------------------------------------
// 

function Salad(type, price, calories, weight) {
  
  this.type = type;
  this.weight = weight;
  
  var crtWeight = weight*0.01;
  Dish.call(this, price*crtWeight, calories*crtWeight);
 
}

Salad.CAESAR = ["caesar", 100, 20];
Salad.OLIVIER = ["olivier", 50, 80];
Salad.prototype = Object.create(Dish.prototype);
Salad.prototype.constructor = Salad;
Salad.prototype.getTypeofSalad = function() {return this.type;}
Salad.prototype.getWeightInGrams = function() {return this.weight;}

// 
//----------------------------- DRINK------------------------------------------
// 

function Drink(type, price, calories) {
  
  Dish.call(this, price, calories);
  this.type = type;
}

Drink.COLA = ["cola", 50, 40];
Drink.COFFEE = ["coffee", 80, 20];
Drink.prototype = Object.create(Dish.prototype);
Drink.prototype.constructor = Drink;
Drink.prototype.getTypeOfDrink = function() { return this.type;}


// 
// ----------------------------ORDER----------------------------------------------
// 

function Order() {

  //constants
  this.SIZE = 0;
  this.FILLING = 0;
  this.TYPE = 0;
  this.PRICE = 1;
  this.CALORIES = 2;
  this.AMOUNT_NUMBERS_FOR_REMOVING = 1;
  
  this.crtOrder = []; 
}

Order.prototype.addGamburger = function(burger, filling) {

  var newBurger = new Gamburger(burger[this.SIZE], burger[this.PRICE] + filling[this.PRICE], 
                      burger[this.CALORIES]+ filling[this.CALORIES], filling[this.FILLING]);
  this.crtOrder.push(newBurger);
}

Order.prototype.deleteGamburger = function(burger, filling) {
  
  for (let i=0; i < this.crtOrder.length; ++i) {

    if (this.crtOrder[i].size == burger[this.SIZE] && 
                this.crtOrder[i].filling == filling[this.FILLING]){

        this.crtOrder.splice(i, this.AMOUNT_NUMBERS_FOR_REMOVING);
        break;
    }
  }

}

Order.prototype.addSalad = function(salad, weight) {
  
  var newSalad = new Salad(salad[this.TYPE], salad[this.PRICE], salad[this.CALORIES], weight);
  this.crtOrder.push(newSalad);
}

Order.prototype.deleteSalad = function(salad, weight) {

  for (let i=0; i < this.crtOrder.length; ++i) {

    if (this.crtOrder[i].type == salad[this.TYPE] && this.crtOrder[i].weight == weight){

        this.crtOrder.splice(i, this.AMOUNT_NUMBERS_FOR_REMOVING);
        break;
    }
  }
}

Order.prototype.addDrink = function(drink) {
  
  var newDrink = new Drink(drink[this.TYPE], drink[this.PRICE], drink[this.CALORIES]);
  this.crtOrder.push(newDrink);
}

Order.prototype.deleteDrink = function(drink) {

  for (let i=0; i < this.crtOrder.length; ++i) {

    if (this.crtOrder[i].type == drink[this.TYPE]){
        this.crtOrder.splice(i, this.AMOUNT_NUMBERS_FOR_REMOVING);
        break;
    }
  }
}

Order.prototype.calculateCalories = function() {
  
  var result = 0;

  for (let i=0; i<this.crtOrder.length; ++i)
    result += this.crtOrder[i].getCalories();

  return result;
}

Order.prototype.calculatePrice = function() {

  var result = 0;

  for (let i=0; i<this.crtOrder.length; ++i)
    result += this.crtOrder[i].getPrice();

  return result;
}

Order.prototype.checkOrder = function() { return this.crtOrder;}

Order.prototype.payOrder = function() {
  
  this.crtOrder.forEach(Object.freeze);
  Object.freeze(this.crtOrder);

}

//
//-----------------------------Main-------------------------------------------
//

var order = new Order();

var weightOfSalad = 300;

order.addGamburger(Gamburger.BIG_SIZE, Gamburger.FILLING_POTATO);
order.addGamburger(Gamburger.BIG_SIZE, Gamburger.FILLING_POTATO);
order.addDrink(Drink.COFFEE);
order.addGamburger(Gamburger.SMALL_SIZE, Gamburger.FILLING_SHEESE);
order.addSalad(Salad.CAESAR, weightOfSalad);
order.addGamburger(Gamburger.BIG_SIZE, Gamburger.FILLING_SALAD);
order.addSalad(Salad.CAESAR, weightOfSalad);
order.addDrink(Drink.COFFEE);

console.log(order.checkOrder());

order.deleteGamburger(Gamburger.BIG_SIZE, Gamburger.FILLING_POTATO);
order.deleteSalad(Salad.CAESAR, weightOfSalad);
order.deleteDrink(Drink.COFFEE);

console.log(order.checkOrder());

console.log("Calories: " + order.calculateCalories());
console.log("Current price: " + order.calculatePrice());

order.payOrder();
console.log(order.checkOrder());

// выдаст ошибку
// order.addDrink(Drink.COLA);

