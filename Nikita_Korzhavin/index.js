var product = require('./api/products.js');
var CombinedProduct = require('./api/combinedProducts.js');
var Hamburger = require('./hamburger.js');
var Drink = require('./drinks.js');
var Salad = require('./salad.js');
var Order = require('./order.js');

// --------------------------------заказ-----------------------------


// так мы передаем в заказ то, что хотим заказать ))
/*var optionsHam = { name: 'hamburger', size: 'small', stuffing: 'cheese' };
var optionsDrink = { name: 'drink', type: 'coke' };
var optionsSalad = { name: 'salad', type: 'cesar' };

var order = new Order();


// в addProduct и в deleteProduct передаем объект с опциями(по нему создается какой-то товар)
// по нему же и ищем в массиве товаров тот, который хотим удалить (используя deleteProduct)
// в pay() передаем просто сумму денег, которую хотим заплатить за заказ
order.addProduct(optionsSalad);
console.log(order);
order.deleteProduct(optionsSalad);
console.log(order);
order.addProduct(optionsDrink);
order.addProduct(optionsHam);
console.log(order.calculatePrice());
console.log(order.calculateCalories());
order.pay(123123);
console.log(order);*/

// --------------------------------hamburger-----------------------------

/*
// так мы передаем в заказ то, что хотим заказать ))
var optionsHam = { name: 'hamburger', size: 'small', stuffing: 'cheese' };
var ham = new Hamburger(optionsHam);

// проверка методов
console.log(ham.calculatePrice());
console.log(ham.calculateCalories());
console.log(ham.getSize());
console.log(ham.getStuffing());

*/