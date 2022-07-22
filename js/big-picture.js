import { isEscapeKey } from './util.js';

const COMMENT_COUNT_LOAD = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');

let commentsLoaded = [];
let commentsCount = COMMENT_COUNT_LOAD;

// обработка клика закрытия окна
const bigPictureCloseClick = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', bigPictureCloseClick);
  // не придумал как удалить прослушиватель позднее его объявления
  document.removeEventListener('keydown', bigPictureEsc);
  commentList.innerHTML = '';
  commentsCount = COMMENT_COUNT_LOAD;
  commentsLoaded = [];
};

// обработка закрытия окна по Esc
const bigPictureEsc =(evt) => {
  evt.preventDefault();
  if(isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPictureCancel.removeEventListener('click', bigPictureCloseClick);
    document.removeEventListener('keydown', bigPictureEsc);
    commentList.innerHTML = '';
    commentsCount = COMMENT_COUNT_LOAD;
    commentsLoaded = [];
  }
};

// создаем комментарий
const createComment = (comment) => {
  const commentCopy = commentTemplate.cloneNode(true);
  commentCopy.querySelector('.social__picture').src = comment.avatar;
  commentCopy.querySelector('.social__picture').alt = comment.name;
  commentCopy.querySelector('.social__text').textContent = comment.message;
  return commentCopy;
};

// создаем комментарии
const createComments = (comments) => {

  const onCommentsLoaderClick = () => {
    createComments(comments);
  };

  commentsCount = (comments.length < COMMENT_COUNT_LOAD) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);

  commentList.innerHTML = '';

  socialCommentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;

  const commentsFragment = document.createDocumentFragment();
  commentsLoaded.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  commentList.appendChild(commentsFragment);

  if (comments.length > COMMENT_COUNT_LOAD && commentsLoaded.length < comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true });
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsCount += COMMENT_COUNT_LOAD;
};

// показываем модальное окно с большим изображением
const showFullPhoto = (photo) => {
  commentList.innerHTML = '';

  commentsCount = COMMENT_COUNT_LOAD;
  commentsLoaded = [];

  body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  createComments(photo.comments.slice());
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  // socialCommentCount.classList.add('hidden');
  // commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', bigPictureCloseClick);
  document.addEventListener('keydown',  bigPictureEsc);
};

export { showFullPhoto };
