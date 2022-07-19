import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const buttonSmaller = uploadModal.querySelector('.scale__control--smaller');
const buttonBigger = uploadModal.querySelector('.scale__control--bigger');
const scaleValue = uploadModal.querySelector('.scale__control--value');
const uploadPreview = uploadModal.querySelector('.img-upload__preview > img');
const uploadModalClose = document.querySelector('#upload-cancel');

// Сброс настроек
const resetSettings = () => {
  scaleValue.value = '100%';
  uploadPreview.style = 'transform: scale(1.00)';
};

// Открытие окна
uploadFile.addEventListener('change',  () => {
  body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');
  resetSettings();
});

// Закрытие окна
const closeEditor  = () => {
  uploadFile.value = '';
  body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

// Обработчик на крестик
uploadModalClose.addEventListener('click',  () => {
  closeEditor();
});

// Обработчик на ESC
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
});

// Изменение размера фото
const ScalePhoto = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

// Обработчик на клик плюс
buttonBigger.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) + ScalePhoto.STEP;

  if (scale >= ScalePhoto.MAX) {
    scale = ScalePhoto.MAX;
  }

  scaleValue.value = `${scale }%`;
  scale = scale / 100;
  uploadPreview.style.transform = `scale(${ scale })`;
});

// Обработчик на клик минус
buttonSmaller.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) - ScalePhoto.STEP;

  if (scale <= ScalePhoto.MIN) {
    scale = ScalePhoto.MIN;
  }

  scaleValue.value = `${scale  }%`;
  scale = scale / 100;
  uploadPreview.style.transform = `scale(${ scale })`;
});
