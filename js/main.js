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
const COMMENT_COUNT = 5;

const LikesCount = {
  min: 15,
  max: 200
};

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MESSAGE_COUNT = 2;

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

let indexID = 0;
let indexChildID = 0;
function createId() {
  indexID = indexID + 1;
  return indexID;
}

function createChildId() {
  indexChildID = indexChildID + 1;
  return indexChildID;
}

const createComment = () => ({
  id: createChildId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES) + ' ' + getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPicture = () => ({
  id: createId(),
  url: `photos/${indexID}.jpg`,
  description: `Описание фотографии ${indexID}`,
  likes: getRandomNumber (LikesCount.min, LikesCount.max),
  comments: Array.from({ length: getRandomNumber(1, COMMENT_COUNT)}, createComment),
});

const similarPictures = Array.from({ length: PICTURE_COUNT}, createPicture);

console.log(similarPictures);
