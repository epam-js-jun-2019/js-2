function Food(type, prise, calorie) {
    this.type = type;
    this.prise = prise;
    this.calorie = calorie;
}

Food.prototype.getPrise = function() {
    return this.prise;
}

Food.prototype.getCalorie = function() {
    return this.calorie;
}

Food.prototype.toString = function() {
    return this.type;
}

function Hamburger(size,stuffing) {
    this.size = size.type;
    this.stuffing = stuffing.type;
    Food.call(this,"Hamburger", size.prise + stuffing.prise, size.calorie + stuffing.calorie);
}

Hamburger.prototype = Food.prototype;

Hamburger.prototype.getSize = function() {
    return this.size;
}

Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
}

Hamburger.prototype.toString = function() {
    return this.type + " (" + this.size + ", " + this.stuffing + ")";
}

function Order() {
    this.foods = [];
}

Order.prototype.add = function(food) {
    if (Object.isFrozen(this.foods)) {
        console.log("you cannot edit an already paid order");
        return;
    }
    this.foods.push(food);
    
    return this;
}

Order.prototype.delete = function(food) {
    if (Object.isFrozen(this.foods)) {
        console.log("you cannot edit an already paid order");
        return this;
    }
    for (var i = 0; i < this.foods.length; i++) {
        if (this.foods[i].type == food.type && this.foods[i].prise == food.prise && this.foods[i].calorie == food.calorie) {
            this.foods.splice(i,1);
            return this;
        }
    }
    console.log("Order doesn't contains this food");
    return this;
}

Order.prototype.calculatePrice = function () {
    var sum = 0;
    this.foods.forEach(function(food) {
        sum += food.getPrise();
    });
    return sum;
}

Order.prototype.calculateCalories = function () {
    var sum = 0;
    this.foods.forEach(function(food) {
        sum += food.getCalorie();
    });
    return sum;
}

Order.prototype.pay = function() {
    Object.freeze(this.foods);
    return this;
}

Order.prototype.print = function() {
    console.log("///////////////////")
    this.foods.forEach(function(food) {
        console.log(food.toString());
    });
    console.log("///////////////////")
    return this;
}

Hamburger.SIZE_SMALL = new Food("small", 50, 20);
Hamburger.SIZE_LARGE = new Food("large", 100, 40);
Hamburger.STUFFING_CHEESE = new Food("sheese", 10, 20);
Hamburger.STUFFING_SALAD = new Food("salad", 20, 5);
Hamburger.STUFFING_POTATO = new Food("potato", 15, 10);

var menu = {
    HAMBURGER : function(size, stuffing) {
        return new Hamburger(size,stuffing)
    },
    SECAR : new Food("Cesar", 100, 20),
    OLIVIE: new Food("Olivie", 50, 80),
    KOLA: new Food("Cola", 50, 40),
    COFFEE: new Food("Coffee", 80, 20),
}



var order = new Order();

order.add(menu.HAMBURGER(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE))
.add(menu.SECAR)
.add(menu.KOLA)
.print()
.delete(menu.KOLA)
.print()
.pay()
.add(menu.COFFEE);

console.log(order.calculatePrice());
console.log(order.calculateCalories());