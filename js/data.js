import {getRandomNumber, getRandomArrayElement} from './util.js';
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
// защита от бесконечного цикла при выходе за пределы диапазона значений
const COMMENT_COUNT_ID = PICTURE_COUNT*COMMENT_COUNT;

const likesCount = {
  MIN: 15,
  MAX: 200
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
  MIN: 1,
  MAX: 2
};

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
  message: concatMessage(getRandomNumber(messagesCount.MIN, messagesCount.MAX)),
  name: getRandomArrayElement(NAMES),
});

// создаем массив с id комментариев, которые уже использовались
// не придумал, как сделать без глобальных переменных
const commentsID = [];
let commentID = getRandomNumber(1, COMMENT_COUNT_ID);

const createComments = (count) => {
  const comments = [];

  for (let i = 1; i <= count; i++) {
    // проверяем, что такого commentID еще не было
    while (commentsID.includes(commentID)) {
      commentID = getRandomNumber(1, COMMENT_COUNT_ID);
    }
    // добавляем id в массив использовавшихся
    commentsID.push (commentID);
    comments.push(createComment(commentID));
  }
  return comments;
};

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: `Описание фотографии ${id}`,
  likes: getRandomNumber (likesCount.MIN, likesCount.MAX),
  comments: createComments(getRandomNumber(1, COMMENT_COUNT)),
});

const createPictures = (count) => {
  const pictures = [];
  for (let i = 1; i <= count; i++) {
    pictures.push(createPicture(i));
  }
  return pictures;
};

export {PICTURE_COUNT, createPictures};
