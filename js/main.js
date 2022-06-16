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

const likesCount = {
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

const messagesCount = {
  min: 1,
  max: 2
};

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

const concatMessage = (count) => {
  const fullMessage = [];
  for (let i = 1; i <= count; i++) {
    fullMessage.push (getRandomArrayElement(MESSAGES));
  }
  return fullMessage.join(' ');
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: concatMessage(getRandomNumber(messagesCount.min, messagesCount.max)),
  name: getRandomArrayElement(NAMES),
});

const createComments = (count) => {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: `Описание фотографии ${id}`,
  likes: getRandomNumber (likesCount.min, likesCount.max),
  comments: createComments(getRandomNumber(1, COMMENT_COUNT)),
});

const createPictures = (count) => {
  const pictures = [];
  for (let i = 1; i <= count; i++) {
    pictures.push(createPicture(i));
  }
  return pictures;
};

console.log(createPictures(PICTURE_COUNT));
