const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');

// обработка клика закрытия окна
const bigPictureCloseClick = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', bigPictureCloseClick);
  // не придумал как удалить прослушиватель позднее его объявления
  document.removeEventListener('keydown', bigPictureEsc);
};

// обработка закрытия окна по Esc
const bigPictureEsc =(evt) => {
  evt.preventDefault();
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPictureCancel.removeEventListener('click', bigPictureCloseClick);
    document.removeEventListener('keydown', bigPictureEsc);
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
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  commentList.appendChild(commentsFragment);
};

// показываем модальное окно с большим изображением
const showFullPhoto = (photo) => {
  commentList.innerHTML = '';
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  createComments(photo.comments);
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', bigPictureCloseClick);
  document.addEventListener('keydown',  bigPictureEsc);
};

export { showFullPhoto };
