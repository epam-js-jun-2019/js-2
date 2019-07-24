
function Food(name){
    this.name=name;
    this.callories=0;
    this.price=0; 
}

Food.prototype.getPrice=function(){
    return this.price;
}

Food.prototype.getCalories=function(){
    return this.callories;
}

function Hamburger(size, stuffing){
    Food.call(this,size)
    this.stuffing=stuffing;
    switch(size){
        case 'small':
            this.price=Hamburger.SIZE_SMALL.price;
            this.callories=Hamburger.SIZE_SMALL.callories;
            break;
        case 'large':
            this.price=Hamburger.SIZE_LARGE.price;
            this.callories=Hamburger.SIZE_LARGE.callories;
            break;
    }
    switch(stuffing){
        case 'cheese':
            this.price+=Hamburger.STUFFING_CHEESE.price;
            this.callories+=Hamburger.STUFFING_CHEESE.callories;
            break;
        case 'salad':
            this.price+=Hamburger.STUFFING_SALAD.price;
            this.callories+=Hamburger.STUFFING_SALAD.callories;
            break;
        case 'potato':
            this.price+=Hamburger.STUFFING_POTATO.price;
            this.callories+=Hamburger.STUFFING_POTATO.callories;
            break;
    }
}

function Drink(name){
    Food.call(this,name);
    switch(name){
        case 'cola':
            this.price=Drink.COLA.price;
            this.callories=Drink.COLA.callories;
            break;
        case 'coffee':
            this.price=Drink.COFFEE.price;
            this.callories=Drink.COFFEE.callories;
            break;
    }
}

function Salad(name){
    Food.call(this,name);
    switch(name){
        case 'olivier':
            this.price=Salad.OLIVIER.price;
            this.callories=Salad.OLIVIER.callories;
            break;
        case 'caesar':
            this.price=Salad.CAESAR.price;
            this.callories=Salad.CAESAR.callories;
            break;
    }
}


Hamburger.prototype=Object.create(Food.prototype);
Salad.prototype=Object.create(Food.prototype);
Drink.prototype=Object.create(Food.prototype);

Hamburger.SIZE_SMALL = {price: 50, callories:20};
Hamburger.SIZE_LARGE = {price: 100, callories:40};
Hamburger.STUFFING_CHEESE = {price: 10, callories:20};
Hamburger.STUFFING_SALAD = {price: 20, callories:5};
Hamburger.STUFFING_POTATO = {price: 15, callories:10};
Salad.OLIVIER = {price: 50, callories: 80};
Salad.CAESAR = {price: 100, callories: 20};
Drink.COLA = {price: 50, callories: 40};
Drink.COFFEE = {price: 80, callories: 20};

function Order(){
    this.items=[];
    this.totalPrice=0;
    this.totalCalories=0; 
    if (arguments.length){
        for (let i=0;i<arguments.length;i++){
            this.items.push(arguments[i]);
            this.totalCalories+=arguments[i].callories;
            this.totalPrice+=arguments[i].price;
        }
    }
}


Order.prototype.getTotalPrice=function(){
    console.log(`Total cost - ${this.totalPrice} ₮`);
}

Order.prototype.getTotalCalories=function(){
    console.log(`There is ${this.totalCalories} calories in your order`);
}

Order.prototype.add=function(food){
    if (Object.isFrozen(this.items)) {
        console.log("You cann't edit payed order");
    } else {
        this.items.push(food);
        this.totalCalories+=food.callories;
        this.totalPrice+=food.price;
        console.log(`Added ${food.name} to your order, ${food.callories} calories, ${food.price} `);

    }
}

Order.prototype.delete=function(food){
    if (Object.isFrozen(this.items)) {
        console.log("You cann't edit payed order");
    } else {
        for (let i=0; i<this.items.length; i++){
            if (food.name===this.items[i].name){
                this.items.splice(i,1)
                this.totalCalories-=food.callories;
                this.totalPrice-=food.price;
                console.log(`${food.name} removed from your order`);
            }
        }
    }
}

Order.prototype.show=function(){
    if(this.items.length){
        console.log("Your order -");
        this.items.forEach(function(elem) {
            if(elem.stuffing){
                console.log(`${elem.name} hamburger with ${elem.stuffing}`)
            }
            else console.log(elem.name)
        }); 
    }  
    else console.log("You haven't ordered anything yet");     
}

Order.prototype.pay = function(){
    Object.freeze(this.items);
    console.log("Your order was paid");
}


var order1 = new Order();
var hamburger1 = new Hamburger('small','salad');
var drink1 = new Drink('cola');
var drink2 = new Drink('coffee');
var salad1 = new Salad('caesar');

order1.add(hamburger1);
order1.add(drink2);
order1.add(salad1);
order1.add(drink1);
order1.delete(drink1);
order1.show();
order1.getTotalCalories();
order1.getTotalPrice();
order1.pay();
order1.add(drink2);
order1.delete(drink1);
