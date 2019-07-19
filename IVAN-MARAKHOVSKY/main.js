function drink(name) {
  this.name = name;
}
drink.COFFEE = { price: 50, calories: 40 };
drink.COLA = { price: 80, calories: 20 };
drink.prototype.getName = function() {
  return this.name;
};

drink.prototype.calculatePrice = function() {
  if (this.price) {
    return this.price;
  }

  if (this.size === "coffee") {
    this.price = drink.COFFEE.price;
  } else {
    this.price = drink.COLA.price;
  }
  return this.price;
};

drink.prototype.calculateCalories = function() {
  if (this.calories) {
    return this.calories;
  }

  if (this.size === "coffee") {
    this.calories = dirnk.COFFEE.calories;
  } else {
    this.calories = drink.COLA.calories;
  }

  return this.calories;
};

function hamburger(name, stuffing) {
  this.name = name;
  this.stuffing = stuffing;
}

hamburger.SIZE_SMALL = { price: 50, calories: 20 };
hamburger.SIZE_LARGE = { price: 100, calories: 40 };
hamburger.STUFFING_CHEESE = { price: 10, calories: 20 };
hamburger.STUFFING_SALAD = { price: 20, calories: 5 };
hamburger.STUFFING_POTATO = { price: 15, calories: 10 };

hamburger.prototype.getSize = function() {
  return this.name;
};

hamburger.prototype.getStuffing = function() {
  return this.stuffing;
};

hamburger.prototype.calculatePrice = function() {
  if (this.price) {
    return this.price;
  }

  if (this.name === "small") {
    this.price = hamburger.SIZE_SMALL.price;
  } else {
    this.price = hamburger.SIZE_LARGE.price;
  }
  switch (this.stuffing) {
    case "cheese":
      this.price += hamburger.STUFFING_CHEESE.price;
      break;
    case "salad":
      this.price += hamburger.STUFFING_SALAD.price;
      break;
    case "potato":
      this.price += hamburger.STUFFING_POTATO.price;
      break;
    default:
      throw new Error("stuffing must contain one and only one position");
  }
  return this.price;
};

hamburger.prototype.calculateCalories = function() {
  if (this.calories) {
    return this.calories;
  }

  if (this.name === "small") {
    this.calories = hamburger.SIZE_SMALL.calories;
  } else {
    this.calories = hamburger.SIZE_LARGE.calories;
  }
  switch (this.stuffing) {
    case "cheese":
      this.calories += hamburger.STUFFING_CHEESE.calories;
      break;
    case "salad":
      this.calories += hamburger.STUFFING_SALAD.calories;
      break;
    case "potato":
      this.calories += hamburger.STUFFING_POTATO.calories;
      break;
    default:
      throw new Error("stuffing must contain one and only one position");
  }
  return this.calories;
};

function salad(name) {
  this.name = name;
}

salad.CAESAR = { price: 100, calories: 20 };
salad.OLIVIE = { price: 50, calories: 80 };
salad.prototype.getName = function() {
  return this.name;
};

salad.prototype.calculatePrice = function() {
  if (this.price) {
    return this.price;
  }

  if (this.size === "caesar") {
    this.price = salad.CAESAR.price;
  } else {
    this.price = salad.OLIVIE.price;
  }
  return this.price;
};

salad.prototype.calculateCalories = function() {
  if (this.calories) {
    return this.calories;
  }

  if (this.size === "small") {
    this.calories = salad.CAESAR.calories;
  } else {
    this.calories = salad.OLIVIE.calories;
  }

  return this.calories;
};

function order() {
  this.orderList = [];
  if (arguments.length) {
    for (let item in arguments) {
      this.add(arguments[item]);
    }
  }
}
order.prototype.add = function() {
  for (let idx in arguments) {
    item = arguments[idx];
    this.orderList.push(item);
    if (!item.stuffing) {
      console.log(`${item.name} added`);
    } else {
      console.log(`${item.name} - ${item.stuffing} added`);
    }
  }
};
order.prototype.getItems = function() {
  for (let idx in this.orderList) {
    console.log(this.orderList[idx]);
  }
};
order.prototype.deleteItem = function(name, stuffing = null) {
  const list = this.orderList;
  for (let idx in list) {
    const item = list[idx];
    if (item.name === name && name !== "small" && name !== "large") {
      list.splice(idx, 1);
      console.log(`Item ${name} deleted`);
      return;
    }
    if (
      item.name == name &&
      (name === "small" || name === "large") &&
      item.stuffing === stuffing
    ) {
      list.splice(item, 1);
      console.log(`Item ${name} - ${stuffing} deleted`);
      return;
    }
  }
  console.log("Item doesnt exist");
};
order.prototype.makePayment = function() {
  Object.freeze(this.orderList);
};
const hb = new hamburger("small", "cheese");
const dr = new drink("coffee");
const sal = new salad("caesar");
const ord = new order(dr, sal);
ord.add(hb);
ord.getItems();
ord.deleteItem("small", "cheese");
ord.makePayment();
