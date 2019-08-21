function calculateCalories (array) {
  return array.reduce(function(acc, curr){
    return acc + curr.getCalories()
  }, 0)
}

function calculatePrice (array) {
  return array.reduce(function(acc, curr){
    return acc + curr.getPrice()
  }, 0)
}


module.exports = {calculateCalories: calculateCalories, calculatePrice: calculatePrice};
