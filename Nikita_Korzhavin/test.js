<<<<<<< HEAD
var product = require('./api/products.js');
var CombinedProduct = require('./api/combinedProducts.js');
var Hamburger = require('./hamburger.js');
var Drink = require('./drinks.js');
var Salad = require('./salad.js');
var Order = require('./order.js');

// --------------------------------заказ-----------------------------

/*
// так мы передаем в заказ то, что хотим заказать ))
var optionsHam = { name: 'hamburger', size: 'small', stuffing: 'cheese' };
var optionsDrink = { name: 'drink', type: 'coke' };
var optionsSalad = { name: 'salad', type: 'cesar' };

var order = new Order();


// в addProduct и в deleteProduct передаем объект с опциями(по нему создается какой-то товар)
// по нему же и ищем в массиве товаров тот, который хотим удалить (используя deleteProduct)
// в pay() передаем просто сумму денег, которую хотим заплатить за заказ
order.addProduct(optionsSalad);
order.deleteProduct(optionsSalad);
order.calculatePrice();
order.calculateCalories();
order.pay(123123);
*/

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
=======
var product = require('./products.js');
var hamburger = require('./hamburger');
/*var hamburger = require('./salad');
var hamburger = require('./order');



console.log()
*/
var product1 = new product(122, 2323);





>>>>>>> 9a5e0f6363438461f06cebf0527aaa88ced8c050
