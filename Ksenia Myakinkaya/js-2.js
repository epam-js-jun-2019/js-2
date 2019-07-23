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


Order.prototype.getPrice=function(){
    return this.totalPrice;
}

Order.prototype.getCalories=function(){
    return this.totalCalories;
}

Order.prototype.add=function(food){
    if (Object.isFrozen(this.items)) throw new Error("You've already paid this oreder");
    this.items.push(food);
    this.totalCalories+=food.callories;
    this.totalPrice+=food.price;
    console.log(`${food.name} was added`);
    this.show();
}

Order.prototype.delete=function(food){
    for (let i=0; i<this.items.length; i++){
        if (food.name===this.items[i].name){
            this.items.splice(i,1)
            this.totalCalories-=food.callories;
            this.totalPrice-=food.price;
            console.log(`${food.name} was deleted`);
        }
    }
    this.show();
}

Order.prototype.show=function(){
    if(this.items.length){
        console.log("Your order:");
        this.items.forEach(elem => {
            if(elem.stuffing){
                console.log(`${elem.name} hamburger with ${elem.stuffing}`)
            }
            else console.log(elem.name)
        }); 
    }  
    else console.log("Order is empty. Add something tasty!");     
}

Order.prototype.pay = function(){
    Object.freeze(this.items);
    console.log("Your order was paid");
}

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
    this.stuffing=stuffing.toLowerCase();
    switch(size.toLowerCase()){
        case 'small':
            this.price=Hamburger.SIZE_SMALL.price;
            this.callories=Hamburger.SIZE_SMALL.callories;
        case 'large':
            this.price=Hamburger.SIZE_LARGE.price;
            this.callories=Hamburger.SIZE_LARGE.callories;
    }
    switch(stuffing.toLowerCase()){
        case 'cheese':
            this.price+=Hamburger.STUFFING_CHEESE.price;
            this.callories+=Hamburger.STUFFING_CHEESE.callories;
        case 'salad':
            this.price+=Hamburger.STUFFING_SALAD.price;
            this.callories+=Hamburger.STUFFING_SALAD.callories;
        case 'potato':
            this.price+=Hamburger.STUFFING_POTATO.price;
            this.callories+=Hamburger.STUFFING_POTATO.callories;
    }
}

Hamburger.prototype=Object.create(Food.prototype);

Hamburger.SIZE_SMALL = {price: 50, callories:20};
Hamburger.SIZE_LARGE = {price: 100, callories:40};
Hamburger.STUFFING_CHEESE = {price: 10, callories:20};
Hamburger.STUFFING_SALAD = {price: 20, callories:5};
Hamburger.STUFFING_POTATO = {price: 15, callories:10};

function Drink(name){
    Food.call(this,name.toLowerCase());
    switch(name.toLowerCase()){
        case 'cola':
            this.price=Drink.COLA.price;
            this.callories=Drink.COLA.callories;
        case 'coffee':
            this.price=Drink.COFFEE.price;
            this.callories=Drink.COFFEE.callories;
    }
}

Drink.prototype=Object.create(Food.prototype);

Drink.COLA = {price: 50, callories: 40};
Drink.COFFEE = {price: 80, callories: 20};

function Salad(name){
    Food.call(this,name.toLowerCase());
    switch(name.toLowerCase()){
        case 'olivier':
            this.price=Salad.OLIVIER.price;
            this.callories=Salad.OLIVIER.callories;
        case 'caesar':
            this.price=Salad.CAESAR.price;
            this.callories=Salad.CAESAR.callories;
    }
}

Salad.prototype=Object.create(Food.prototype);

Salad.OLIVIER = {price: 50, callories: 80};
Salad.CAESAR = {price: 100, callories: 20};