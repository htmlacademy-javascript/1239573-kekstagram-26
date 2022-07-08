import {createPictures, PICTURE_COUNT} from './data.js';

const photosArray = createPictures(PICTURE_COUNT);

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPhoto = ({ url, comments, likes }) => {
  const photoPreview = pictureTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;
  photoPreview.querySelector('.picture__likes').textContent = likes;
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
