const getRandomNumber = (min, max) => {
  if (min > max) {
    const iTemp = max;
    max = min;
    min = iTemp;
  }
  const result = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  return Math.floor(result);
};

const checkLenght = (checkString, maxlegth) => checkString.length < maxlegth;
checkLenght('Проверяемая строка', 20);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, checkLenght, getRandomArrayElement};
