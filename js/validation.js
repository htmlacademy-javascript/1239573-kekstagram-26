import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
}, false);

const commentlength = 140;
const hashtagsCount = 5;

const validateComment = (value) => value.length <= commentlength;
const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const isArrayInique = (arrayToCheck) => {
  const length = arrayToCheck.length;

  for (let i = 0; i < length; i++) {
    const comparedElement = arrayToCheck[i];

    for (let j = i + 1; j < length; j++) {
      const elementToCompare = arrayToCheck[j];

      if (comparedElement === elementToCompare && comparedElement !== '#') {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(textHashtags, (hashtags) => preparedHashtags(hashtags).length <= hashtagsCount,
  'Вы можете указать не более 5 хэштегов');

pristine.addValidator(textHashtags, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /[^-_=+;:,.]$/m.test(value)),
  'Хэштеги нужно разделять пробелами');

pristine.addValidator(textHashtags, (hashtags) => isArrayInique(preparedHashtags(hashtags)),
  'Хэштеги не должны повторяться');

pristine.addValidator(textHashtags, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,19}$/.test(value)),
  'Хэштег должен начинаться с #, состоять из букв и цифр, максимальная длина хэштэга 20 символов');

pristine.addValidator(textDescription, validateComment,
  'Комментарий должен быть короче 140 символов');


uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const onEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textDescription.addEventListener('keydown', onEscapeDown);
textHashtags.addEventListener('keydown', onEscapeDown);
