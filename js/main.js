function getRandom(min, max) {
  if (min < 0 || max < 0) {
    return 'Введите положительное значение';
  }
  else {
    let newMin = min;
    let newMax = max + 1;
    if (min > max) {
      newMin = max;
      newMax = min + 1;
    }
    return Math.floor(newMin) + Math.floor(Math.random() * (newMax - newMin));
  }
}

getRandom(5, 10);

function checkLenght(checkString, maxlegth) {
  return checkString.length < maxlegth;
}

checkLenght('Проверяемая строка', 20);
