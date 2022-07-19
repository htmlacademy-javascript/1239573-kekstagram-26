import {createPictures, PICTURE_COUNT} from './data.js';
import {showFullPhoto } from './big-photo.js';

const photosArray = createPictures(PICTURE_COUNT);

const pictureCopy = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPhoto = (photo) => {
  const photoPreview = pictureCopy.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = photo.url;
  photoPreview.querySelector('.picture__comments').textContent = photo.comments.length;
  photoPreview.querySelector('.picture__likes').textContent = photo.likes;

  // добавляем прослушиватель на клик
  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    showFullPhoto(photo);
  });

  return photoPreview;
};

const createPhotos = () => {
  const photoListFragment = document.createDocumentFragment();

  photosArray.forEach((picture) => {
    photoListFragment.appendChild(createPhoto(picture));
  });

  picturesList.appendChild(photoListFragment);
};

export { createPhotos };
