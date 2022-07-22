const ALERT_SHOW_TIME = 4000;
// Получение случайного числа в диапазоне от min до max
const getRandomNumber = (min, max) => {
  if (min > max) {
    const iTemp = max;
    max = min;
    min = iTemp;
  }
  const result = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  return Math.floor(result);
};

// Проверка длины строки
const checkLenght = (checkString, maxlegth) => checkString.length < maxlegth;
checkLenght('Проверяемая строка', 20);

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Проверка клавиши ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, checkLenght, getRandomArrayElement, isEscapeKey, showAlert};
