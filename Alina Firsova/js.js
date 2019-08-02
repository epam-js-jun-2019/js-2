var position = 0;
var order=[];

function remover(element){
    delIndex=element.parentNode.id;
   try{ 
   for (var i = 0; i < order.length; i++){
        if (order[i].positionInOrder==delIndex){
            order.splice(i,1);
            break;
        }
   }
   element.parentNode.remove();
   orderPriceAndCalorage();
}
catch{
    alert('Редактирование заказа после оплаты невозможно! :(')
}
}


function add_to_order(element){
    position=position+1;
    var check = document.getElementById('check');
    var addToCheck = document.createElement('div');
    var foodClass = element.parentNode.id;
    if (foodClass =='Hamburger'){
        var size=document.querySelector('input[name=HamburgerSize]:checked').value;
        var select=document.getElementById('hamburgerStuffing');
        var stuffing=select.options[select.selectedIndex].value;
        menuPosition = new Hamburger(size, stuffing, position);
        order.push(menuPosition);
        addToCheck.innerHTML='<div id="'+position+'" class="positionInOrder">'+size+' гамбургер, начинка - '+(select.options[select.selectedIndex].text).toLowerCase()+'; <button onclick="remover(this)">Удалить</button></div>'
       }
    if (foodClass=='Salad'){
        var type=document.querySelector('input[name=saladType]:checked').value;
        var weight=document.getElementById('saladWeight').value;
        if ((weight<100)||(weight>1000)){
            alert("Пожалуйста, выберете вес порции от 100 до 1000 грамм")
            document.getElementById('saladWeight').value=100;
            return 
        }
        menuPosition = new Salad(type, weight, position);
        order.push(menuPosition);
        addToCheck.innerHTML='<div id="'+position+'" class="positionInOrder">Салат '+type.toLowerCase()+', '+weight+' грамм; <button onclick="remover(this)">Удалить</button>';}
        
        
    if (foodClass=='Drink'){
        var type=document.querySelector('input[name=drinkType]:checked').value;
        menuPosition = new Drink(type, position);
        order.push(menuPosition);
        addToCheck.innerHTML='<div id="'+position+'" class="positionInOrder">'+type+'; <button onclick="remover(this)">Удалить</button>';
    }
    check.appendChild(addToCheck);
    orderPriceAndCalorage();
}


function Hamburger (size, stuffing, positionInOrder) {
    this.size = size;
    this.stuffing = stuffing;
    this.positionInOrder = positionInOrder;
  }
Hamburger.SIZE_SMALL = {
    price:50,calorage:20
}
Hamburger.SIZE_LARGE = {
    
    price:100,calorage:40
}
Hamburger.STUFFING_CHEESE = {
    price:10,calorage:20
}
Hamburger.STUFFING_SALAD = {
    price:20,calorage:5
}
Hamburger.STUFFING_POTATO = {
    price:15,calorage:10 
}
Hamburger.prototype.getSize = function () {
    if (this.size=='Маленький'){
return this.size=Hamburger.SIZE_SMALL;
    }
    if (this.size=='Большой'){
        return this.size=Hamburger.SIZE_LARGE;
            }
}
Hamburger.prototype.getStuffing = function () {
    if (this.stuffing=='cheese'){
        return this.stuffing=Hamburger.STUFFING_CHEESE;
            }
    if (this.stuffing=='salad'){
        return this.stuffing=Hamburger.STUFFING_SALAD;
                    }
   if (this.stuffing=='potato'){
        return this.stuffing=Hamburger.STUFFING_POTATO;
                            }
}

Hamburger.prototype.calculatePrice = function () {
    this.getSize();
    this.getStuffing();
    return this.size.price+this.stuffing.price;
}

Hamburger.prototype.calculateCalories = function () {
    this.getSize();
    this.getStuffing();
    return this.size.calorage+this.stuffing.calorage;}
function Salad(type,weight, positionInOrder){
        this.type=type;
        this.weight=weight;
        this.positionInOrder = positionInOrder;
    } 
Salad.TYPE_OLIVYE = {
    price:50,calorage:80
}
Salad.TTYPE_CAESAR = {
    price:100,calorage:20
}

Salad.prototype.getType = function(){
    if (this.type=='Оливье'){
        return this.type=Salad.TYPE_OLIVYE;
            }
    if (this.type=='Цезарь'){
        return this.type=Salad.TTYPE_CAESAR;
            }
}
Salad.prototype.calculatePrice = function () {
    this.getType();
    return this.type.price*((this.weight)/100);
}
Salad.prototype.calculateCalories = function () {
    this.getType();
    return this.type.calorage*((this.weight)/100);
}

function Drink(type, positionInOrder){
        this.type=type;
        this.positionInOrder = positionInOrder;
        
    
}
Drink.TYPE_COLA = {
    price:50,calorage:40
}
Drink.TYPE_COFFEE = {
    price:80,calorage:20
}

Drink.prototype.getType = function(){
    if (this.type=='Кола'){
        return this.type=Drink.TYPE_COLA; 
    }
    if (this.type=='Кофе'){
        return this.type=Drink.TYPE_COFFEE; 
    }
}

Drink.prototype.calculatePrice = function () {
    this.getType();
    return this.type.price;
}

Drink.prototype.calculateCalories = function () {
    this.getType();
    return this.type.calorage;
}

function orderPrice(){
    orderTotalSum = order.reduce(function(total,orderPosition){
        return total+orderPosition.calculatePrice();
    },0);
    return orderTotalSum;
   
 }
 function orderCalorage(){
    orderTotalCal = order.reduce(function(total,orderPosition){
        return total+orderPosition.calculateCalories();
    },0);
   
    return orderTotalCal;
 }

 function pay(){
    document.getElementById('order').innerHTML='<h2>СПАСИБО ЗА ЗАКАЗ!</h2>';
    order = Object.freeze(order);
     
 }

 function orderPriceAndCalorage(){
    document.getElementById('total').innerHTML='Cумма - '+orderPrice()+' руб., калораж - '+orderCalorage()+' калл.';
 }