// demo: https://repl.it/@kulikov98/js-2

var Hamburger = require('./Hamburger');
var Salad = require('./Salad');
var Drink = require('./Drink');
var Cart = require('./Cart');
var Order = require('./Order');

var order = new Order();
order.add(Hamburger, { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE', quantity: 3 })
  .add(Salad, { name: 'CESAR', quantity: 2 })
  .add(Drink, { name: 'COFFEE', quantity: 2 })
  .remove(Salad, { name: 'CESAR' })
  .remove(Hamburger, { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE', quantity: 2 })
  .checkout()
  .printReceipt();