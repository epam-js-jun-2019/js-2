/**
* * * * * * * CLASS FOOD * * * * * * * 
*/

function Food(price, calories) {
    this.price = price;
    this.calories = calories;
}

/**
 * Get know a price
 */
Food.prototype.calculatePrice = function (price) {
    this.price += price || 0;
}

/**
 * Get know calories
 */
Food.prototype.calculateCalories = function (calories) {
    this.calories += calories || 0;
}

/**
* * * * * * * HAMBURGER * * * * * * * 
*/

function Hamburger(size, stuffing) {

    this.size = size;
    this.stuffing = stuffing;

    var hamPrice, hamCalories;

    hamPrice = +size[0] + stuffing.reduce(function(acc, value){
        acc += +value[0];
        return acc;
    },0);

    hamCalories = +size[1] + stuffing.reduce(function(acc, value){
        acc += +value[1];
        return acc;
    },0);

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
 * Get know a type of humburger
 */
Hamburger.prototype.getSize = function (size) {
    
}

/**
 * Get know a stuffing of humburger
 */
Hamburger.prototype.getStuffing = function () {

}


/**
* * * * * * * SALAD * * * * * * *
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
* * * * * * * DRINK * * * * * * * 
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





//***************************************************************/
 

var H1 = new Hamburger (Hamburger.SIZE_SMALL, [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_POTATO]);

console.log(H1);