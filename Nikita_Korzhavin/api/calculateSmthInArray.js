function calculateSmth(param, array) {
  if (param === undefined || array === undefined) {
    throw new Error('smth wrong in calculateSmth function');
  }
  var smth = 0;
  var numOfItems = array.length;
  for (var i = 0; i < numOfItems; i++) {
    smth += array[i][param];
  }
  return smth;
}

module.exports = calculateSmth;
