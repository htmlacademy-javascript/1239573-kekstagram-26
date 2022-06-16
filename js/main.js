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

function getRandomNumber(min, max) {
  if (min > max) {
    const iTemp = max;
    max = min;
    min = iTemp;
  }
  const result = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  return Math.floor(result);
}

function checkLenght(checkString, maxlegth) {
  return checkString.length < maxlegth;
}

checkLenght('Проверяемая строка', 20);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createPicture = () => ({
  id: getRandomNumber (1, PICTURE_COUNT),
  url: `photos/${getRandomNumber (1, PICTURE_COUNT)}.jpg`,
  description: `Описание фотографии ${getRandomNumber (1, PICTURE_COUNT)}`,
  likes: '',
  comments: {
    id: '',
    avatar: `img/avatar-${getRandomNumber (1, 6)}.svg`,
    message: '',
    name: getRandomArrayElement(NAMES),
  },
});

const similarPictures = Array.from({ length: PICTURE_COUNT}, createPicture);

console.log(similarPictures);
