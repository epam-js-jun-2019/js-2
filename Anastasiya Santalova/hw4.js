"use strict"

/**
* * * * * * * ORDER * * * * * * * 
*/

function Order () {
    this.products = [];
}

/**
* Accept data from added food
*/

Order.prototype.acceptHumburger = function (Hamburger) {
    this.products.push(Hamburger);
}

Order.prototype.acceptSalad = function (Salad) {
    this.products.push(Salad);
}

Order.prototype.acceptDrink = function (Drink) {
    this.products.push(Drink);
}

/**
* Delete data from order
*/

Order.prototype.deleteProduct = function (name) {
    this.products = this.products.filter((arg) => arg !== name);
}

/**
 * Get know a price
 */
Order.prototype.calculatePrice = function () {

    this.totalPrice = this.products.reduce(function(acc, obj){
        acc += obj.price;
        return acc;
    }, 0);

}

/**
 * Get know calories
 */

Order.prototype.calculateCalories = function () {
    
    this.totalCalories = this.products.reduce(function(acc, obj){
        acc += obj.calories;
        return acc;
    }, 0);

}

/**
* Paid order
*/

Order.prototype.paid = function () {

    this.products.forEach(Object.freeze);
    Object.freeze(this.products);
    Object.freeze(this);

}


/**
* * * * * * * CLASS FOOD * * * * * * * 
*/

function Food(price, calories) {
    this.price = price;
    this.calories = calories;
}


/**
* * * * * * * CLASS HAMBURGER * * * * * * * 
*/

function Hamburger(size, stuffing) {

    this.size = size;
    this.stuffing = stuffing;

    var hamPrice, hamCalories, priceOfStuffing, caloriesOfStuffing;

    if (stuffing[0][0]) {

        priceOfStuffing = stuffing.reduce(function(acc, value){
            acc += +value[0];
            return acc;
        },0);

    } else {
        priceOfStuffing = +stuffing[0];
    }

    hamPrice = +size[0] + priceOfStuffing;

    if (stuffing[0][0]) {

        caloriesOfStuffing = stuffing.reduce(function(acc, value){
            acc += +value[1];
            return acc;
        },0);

    } else {
        caloriesOfStuffing = +stuffing[1];
    }

    hamCalories = +size[1] + caloriesOfStuffing;

    Food.call(this, hamPrice, hamCalories);

} 


/**
* Sizes and types of stuffing 
*/
Hamburger.SIZE_SMALL = [50, 20];
Hamburger.SIZE_LARGE = [100, 40];
Hamburger.STUFFING_CHEESE = [10, 20];
Hamburger.STUFFING_SALAD = [20, 5];
Hamburger.STUFFING_POTATO = [15, 10];

Hamburger.prototype = Object.create(Food.prototype);


/**
* * * * * * * CLASS SALAD * * * * * * *
*/

function Salad(name) {
    
    this.name = name;

    var saladPrice, saladCalories;

    saladPrice = name[0];
    saladCalories = name[1];

    Food.call(this, saladPrice, saladCalories);
} 

/**
* Types of salads 
*/
Salad.CAESAR = [100, 20];
Salad.RUSSIAN_SALAD = [50, 80];


/**
* * * * * * * CLASS DRINK * * * * * * * 
*/

function Drink(type) {

    this.type = type;

    var drinkPrice, drinkCalories;

    drinkPrice = type[0];
    drinkCalories = type[1];

    Food.call(this, drinkPrice, drinkCalories);
} 

/** 
* Types of drinks 
*/
Drink.COLA = [50, 40];
Drink.COFFEE = [80, 20];





//*********************************************************************************//

var food = new Food();
var order = new Order();

var H1 = new Hamburger (Hamburger.SIZE_SMALL, [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_POTATO]);
var H2 = new Hamburger (Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
var drink = new Drink(Drink.COLA);
var salad = new Salad(Salad.RUSSIAN_SALAD);
var salad1 = new Salad(Salad.CAESAR);

order.acceptHumburger(H1);
order.acceptHumburger(H2);
order.acceptDrink(drink);
order.acceptSalad(salad);

order.deleteProduct(H1);

order.calculatePrice();
order.calculateCalories();

//console.log(order);


order.paid();

try {
    order.deleteProduct(salad);
} catch(e) {
    console.log("Изменение невозможно. Заказ оплачен.")
}

try {
    order.acceptSalad(salad1);
} catch(e) {
    console.log("Изменение невозможно. Заказ оплачен.")
}

console.log(order);
