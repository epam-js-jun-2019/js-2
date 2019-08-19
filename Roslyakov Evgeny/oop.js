//---------- Class MenuItem ----------//
/*@constructor
 *@param name       item name
 *@param price      item price
 *@param calories   item calories number
 */
function MenuItem(options) {
    this.name = options.name;
    this.price = options.price;
    this.calories = options.calories;
}

/* Get the item name */
MenuItem.prototype.getName = function () {
    if(!this.name) {
        return this.size.name;
    }
    return this.name;
};

/* Get the item price */
MenuItem.prototype.getPrice = function () {
    return this.price;
};

/* Get the item calories */
MenuItem.prototype.getCalories = function () {
    return this.calories;
};


//---------- Class Hamburger ----------//
/*@constructor
 * @param size        the humburger size
 * @param stuffing    the humburger stuffing
 */
function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = [].concat([].slice.call(arguments, 1));
}

/* Inheritance */
Hamburger.prototype = Object.create(MenuItem.prototype);

/* Sizes and stuffing constants */
var hamburgerOptions = {};

hamburgerOptions.SIZE_SMALL = {
    name: 'small size',
    price: 50,
    calories: 20
};
hamburgerOptions.SIZE_LARGE = {
    name: 'large size',
    price: 100,
    calories: 40
};
hamburgerOptions.STUFFING_CHEESE = {
    name: 'cheese',
    price: 10,
    calories: 20
};
hamburgerOptions.STUFFING_SALAD = {
    name: 'salad',
    price: 20,
    calories: 5
};
hamburgerOptions.STUFFING_POTATO = {
    name: 'potato',
    price: 15,
    calories: 10
};

/* Get the humburger size (= its name) */
Hamburger.prototype.getSize = function () {
    return this.getName.call(this);
};

/* Get the humburger stuffing */
Hamburger.prototype.getStuffing = function () {
    var stuffings = '';
    this.stuffing.forEach(function (item) {
        stuffings += item.name + ' ';
    });
    return stuffings.trim();
};

/* Calculate the humburger price */
Hamburger.prototype.calculatePrice = function () {
    var stufPrice = this.stuffing.reduce(function (acc, cur) {
        return acc + cur.price;
    }, 0);
    this.price = this.size.price + stufPrice;
    return this.price;
};

/* Calculate the humburger calories */
Hamburger.prototype.calculateCalories = function () {
    var stufCalories = this.stuffing.reduce(function (acc, cur) {
        return acc + cur.calories;
    }, 0);
    this.calories = this.size.calories + stufCalories;
    return this.calories;
};


//---------- Class Salad ----------//
/*@constructor
 * @param salad        the chosen salad constant
 */
function Salad(options) {
    MenuItem.call(this, options);
}

/* Inheritance */
Salad.prototype = Object.create(MenuItem.prototype);

/* Salad constants */
var saladOptions = {};

saladOptions.CEASAR = {
    name: 'Ceasar',
    price: 100,
    calories: 20
};
saladOptions.OLIVIER = {
    name: 'Olivier',
    price: 50,
    calories: 80
};


//---------- Class Drink ----------//
/*@constructor
 * @param drink        the chosen drink constant
 */
function Drink(options) {
    MenuItem.call(this, options);
}

/* Inheritance */
Drink.prototype = Object.create(MenuItem.prototype);

/* Drinks constants */
var drinkOptions = {};

drinkOptions.COKE = {
    name: 'coke',
    price: 50,
    calories: 40
};
drinkOptions.COFFEE = {
    name: 'coffee',
    price: 80,
    calories: 20
};


//---------- Class Order ----------//
function Order() {
    this.items = [];
};

/* Add new item(s) to the order */
Order.prototype.addItems = function() {
    this.items = this.items.concat([].slice.call(arguments));
    return this;
};

/* Delete selected item from the order */
Order.prototype.rmItem = function(rmName) {
    if(this.items.length) {
        this.items = this.items.filter(function (item) {
            if(!item.name) {
                return item.size.name !== rmName;
            }
            return item.name !== rmName;
        });
        return this.items;
    } else {
        return 'The order is empty';
    }
};

/* Print the order contents  */
Order.prototype.printOrder = function() {
    var orderList = '----- the order contains:\n';
    if(this.items.length) {
        this.items.forEach(function (item) {
            if(!item.name) {
                var hamburger = '----- ' + item.size.name + ' hamburger';
                item.stuffing.forEach(function (stuffing) {
                    hamburger += ' with ' + stuffing.name;
                })
                orderList += hamburger + '\n';
            } else {
                orderList += '----- ' + item.name + '\n';
            }
        });
        return orderList;
    } else {
        return 'The order is empty';
    }
};

/* Pay for the order */
Order.prototype.payForOrder = function() {
    this.items.forEach(function (item) {
        if(!item.name) {
            for(var key in item) {
                item[key] = Object.freeze(item[key]);
            }
        }
        item = Object.freeze(item);
    });
    this.items = Object.freeze(this.items);
    return this.totalPrice();
};

/* Calculate the order total */
Order.prototype.totalPrice = function () {
    var totalPrice = this.items.reduce(function (acc, cur) {
        if(!cur.price) {
            return acc + cur.calculatePrice();
        };
        return acc + cur.price;
    }, 0);
    return totalPrice;
};

/* Calculate order calories */
Order.prototype.totalCalories = function () {
    var totalCalories = this.items.reduce(function (acc, cur) {
        if(!cur.calories) {
            return acc + cur.calculateCalories();
        }
        return acc + cur.calories;
    }, 0);
    return totalCalories;
};


//---------- Testing ----------//
var salad1 = new Salad(saladOptions.CEASAR);
var drink1 = new Drink(drinkOptions.COFFEE);
var sandw1 = new Hamburger(hamburgerOptions.SIZE_SMALL,
                           hamburgerOptions.STUFFING_SALAD,
                           hamburgerOptions.STUFFING_CHEESE);

// console.log(sandw1.calculatePrice() + ' tugs is the hamburger price');
// console.log(sandw1.calculateCalories() + ' cals is the hamburger calorific value');
// console.log(sandw1.getStuffing() + ' are toppings in this hamburger');
// console.log(sandw1.getSize() + ' is the size of this hamburger');

var order1 = new Order();
order1.addItems(salad1, drink1, sandw1);
console.log(order1.printOrder());
console.log(order1.rmItem('Ceasar'));

// var price1 = order1.totalPrice();
// var calories1 = order1.totalCalories();
// console.log('Order 1 price: ' + price1 + ' tugs, calories: ' + calories1 + ' cals');

// order1.rmItem('small size');
// price1 = order1.totalPrice();
// calories1 = order1.totalCalories();
// console.log('Order 1 minus humburger price: ' + price1 + ' tugs, calories: ' + calories1 + ' cals');