const NAMES = [
  'Иван',
  'Петр',
  'Мария',
  'Сергей',
  'Олег',
  'Юлия',
  'Татьяна',
  'Ирина',
  'Алексей',
  'Константин',
  'Кирилл',
  'Анна',
];

const PICTURE_COUNT = 25;

// function getRandomNumber(min, max) {
//   if (min < 0 || max < 0) {
//     return 'Введите положительное значение';
//   }
//   else {
//     let newMin = min;
//     let newMax = max + 1;
//     if (min > max) {
//       newMin = max;
//       newMax = min + 1;
//     }
//     return Math.floor(newMin) + Math.floor(Math.random() * (newMax - newMin));
//   }
//  }

function getRandomNumber(min, max) {
    if (min > max) {
      const iTemp = max;
      max = min;
      min = iTemp;
    }
    return Math.floor(Math.abs(min)) + Math.floor(Math.random() * (Math.abs(max) - Math.abs(min)));
 }

getRandomNumber(5, 10);

function checkLenght(checkString, maxlegth) {
  return checkString.length < maxlegth;
}

checkLenght('Проверяемая строка', 20);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createPicture = () => ({
  id: '',
  url: '',
  description: '',
  likes: '',
  comments: getRandomArrayElement(NAMES),
});

const similarPictures = Array.from({ length: PICTURE_COUNT }, createPicture);

console.log(similarPictures);
