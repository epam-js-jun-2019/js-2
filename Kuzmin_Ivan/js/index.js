var cart = [];
var menu = [
  {
    type: 'hamburger',
    size: 'small',
    calories: 40,
    stuffing: 'cheese',
    price: 60
  },
  {
    type: 'hamburger',
    size: 'large',
    calories: 60,
    stuffing: 'cheese',
    price: 110
  },
  {
    type: 'hamburger',
    size: 'small',
    calories: 25,
    stuffing: 'salad',
    price: 70
  },
  {
    type: 'hamburger',
    size: 'large',
    calories: 45,
    stuffing: 'salad',
    price: 120
  },
  {
    type: 'hamburger',
    size: 'small',
    calories: 30,
    stuffing: 'potato',
    price: 65
  },
  {
    type: 'hamburger',
    size: 'large',
    calories: 50,
    stuffing: 'potato',
    price: 115
  },
  {
    type: 'salad',
    size: 100,
    calories: 20,
    stuffing: 'cezar',
    price: 100
  },
  {
    type: 'salad',
    size: 100,
    calories: 80,
    stuffing: 'olivie',
    price: 50
  },
  {
    type: 'drink',
    size: 500,
    calories: 40,
    stuffing: 'cola',
    price: 50
  },
  {
    type: 'drink',
    size: 200,
    calories: 20,
    stuffing: 'coffee',
    price: 80
  }
];

// Food class
function Food(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
}
Food.prototype.getMenu = function() {
  return menu;
}
Food.prototype.getSize = function() {
  return this.size;
}
Food.prototype.getStuffing = function() {
  return this.stuffing;
}
Food.prototype.getPosition = function() {
  // For hamburgers
  var self = this;
  return this.getMenu().find(function(position){
    return position.size === self.getSize() && position.stuffing === self.getStuffing();
  });
}
Food.prototype.calculatePrice = function() {
  // For hamburgers
  return this.getPosition().price;
}
Food.prototype.calculateCalories = function() {
  // For hamburgers
  return this.getPosition().calories;
}


// Hamburger class
function Hamburger() {
  Food.apply(this, Array.prototype.slice.call(arguments));
}
Hamburger.prototype = Object.create(Food.prototype);

// Salad class
function Salad() {
  Food.apply(this, Array.prototype.slice.call(arguments));
}
Salad.prototype = Object.create(Food.prototype);
Salad.prototype.getPosition = function() {
  var self = this;
  return this.getMenu().find(function(position){
    return position.stuffing === self.getStuffing();
  });
}
Salad.prototype.calculatePrice = function() {
  
  var salad = this.getPosition();
  return this.getSize() / salad.size * salad.price;
}
Salad.prototype.calculateCalories = function() {
  var salad = this.getPosition();
  return this.getSize() / salad.size * salad.calories;
}

// Dring class
function Drink() {
  Food.apply(this, Array.prototype.slice.call(arguments));
}
Drink.prototype = Object.create(Salad.prototype);


// Draw elements on menu page
function drawElements(menu) {
  menu.forEach(function(item) {
    var saladOrDrink = item.type === 'drink' || item.type === 'salad';
    var mark = item.type === 'drink' ? 'ml' : item.type === 'salad' ? 'gr' : '';
    var MENU_ITEM_CLASS = 'menu__navigation-item';
    var MENU_ITEM_HEADER_CLASS = 'menu__navigation-item-text';
    var MENU_ITEM_PRICE_CLASS = 'menu__navigation-item-price';
    var MENU_ITEM_CALORIES_CLASS = 'menu__navigation-item-calories';
    var MENU_ITEM_BUTTON_CLASS = 'menu__navigation-item-button';
    // var MENU_ITEM_INPUT_CLASS = 'menu__navigation-item-input';

    var HEADER_INNERTEXT = item.type + ': ' + (!saladOrDrink ? item.size  + ', ' : '') + item.stuffing;
    var PRICE_INNERTEXT = 'Price: ' + item.price + (saladOrDrink ? ' for ' + item.size + ' ' + mark : '');
    var CALORIES_INNERTEXT = 'Calories: ' + item.calories;
    var BUTTON_INNERTEXT = 'Buy me fatty :)';
    // var INPUT_PLACEHOLDER =  'Enter size here';

    var menuItem = document.createElement('div');
    menuItem.className = MENU_ITEM_CLASS;
    menuItem.dataset.size = item.size;
    menuItem.dataset.stuffing = item.stuffing;
    menuItem.dataset.type = item.type;

    var headerText = document.createElement('h4');
    headerText.className = MENU_ITEM_HEADER_CLASS;
    headerText.innerText = HEADER_INNERTEXT;

    var price = document.createElement('p');
    price.className = MENU_ITEM_PRICE_CLASS;
    price.innerText = PRICE_INNERTEXT;

    var calories = document.createElement('p');
    calories.className = MENU_ITEM_CALORIES_CLASS;
    calories.innerText = CALORIES_INNERTEXT;

    var buyButton = document.createElement('button');
    buyButton.innerText = BUTTON_INNERTEXT;
    buyButton.className = MENU_ITEM_BUTTON_CLASS;

    menuItem.append(headerText, price, calories);

    // if (saladOrDrink) {
    //   var inputSize = document.createElement('input');
    //   inputSize.className = MENU_ITEM_INPUT_CLASS;
    //   inputSize.placeholder = INPUT_PLACEHOLDER;
    //   inputSize.addEventListener('input', function(event) {
    //     menuItem.dataset.size = event.target.value;
    //   })
    //   menuItem.append(inputSize);
    // }

    menuItem.appendChild(buyButton);

    var panel = document.getElementsByClassName('menu__navigation-panel')[0];
    panel.appendChild(menuItem);
  });
}

function setBuyButtonOnClick(className) {
  
  Array.prototype.slice
    .call(document.getElementsByClassName(className))
    .forEach(function(button) {
      button.addEventListener('click', function(event) {

        var item = event.target.closest('.menu__navigation-item');
        var size = item.dataset.size;
        var type = item.dataset.type;
        var stuffing = item.dataset.stuffing;

        switch(type) {
          case 'drink':
            cart.push(new Drink(size, stuffing));
            break;
          case 'hamburger':
            cart.push(new Hamburger(size, stuffing));
            break;
          case 'salad':
            cart.push(new Salad(size, stuffing));
            break;
        };

        renderCart(cart);
      });
    })  
}

function renderCart(cart) {
  var cartElement = document.getElementsByClassName('menu__summary-cart')[0];
  cartElement.innerHTML = '';
  cart.forEach(function(position, index) {
    var item = position.getPosition();
    var name = item.type + ' ' + item.stuffing + ' size: '
      + position.getSize() + ' price: ' + position.calculatePrice()
      + ' calories: ' + position.calculateCalories();

    var cartPosition = document.createElement('div');
    cartPosition.className = 'menu__summary-position';
    cartPosition.id = index;

    var nameText = document.createElement('p');
    nameText.className = 'menu__summary-name';
    nameText.innerText = name;

    var remove = document.createElement('p');
    remove.className = 'menu__summary-remove';
    remove.innerText = 'X';

    cartPosition.append(nameText, remove);
    cartElement.appendChild(cartPosition);
  })

  var sum = cart.reduce(function(acc, next) {
    return acc + next.calculatePrice();
  }, 0);

  var calories = cart.reduce(function(acc, next) {
    return acc + next.calculateCalories();
  }, 0);

  document.getElementsByClassName('menu__summary-final-price')[0].innerText = sum;
  document.getElementsByClassName('menu__summary-final-calories')[0].innerText = calories;

  setRemoveEvent();
}

function setRemoveEvent() {
  Array.prototype.slice
    .call(document.getElementsByClassName('menu__summary-remove'))
    .forEach(function(removeButton) {
      removeButton.addEventListener('click', function(event) {
        var position = event.target.closest('.menu__summary-position');
        var id = position.id;
        cart.splice(id, 1);
        renderCart(cart);
      })
    })
}

function setDisableAfterPaied() {
  document
    .getElementsByClassName('menu__summary-pay-button')[0]
    .addEventListener('click', function(event) {
      var buyButtons = Array.prototype.slice.call(document.getElementsByClassName('menu__navigation-item-button'));
      var removeButtons = Array.prototype.slice.call(document.getElementsByClassName('menu__summary-remove'));
      buyButtons.concat(removeButtons).forEach(function(element) {
        element.style.pointerEvents = 'none';
      })
    })
}

drawElements(menu);
setBuyButtonOnClick('menu__navigation-item-button');
setDisableAfterPaied();