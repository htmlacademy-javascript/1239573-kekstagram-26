const DEFAULT_EFFECT_LEVEL = 100;
// const SCALESTEP = 25;
// const MINSCALE= 25;
// const MAXSCALE = 100;

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const effectsGroup = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview > img');
const levelValue = document.querySelector('.effect-level__value');

effectLevel.classList.add('visually-hidden');

let lastClass = '';

const effects = {
  none: () => {
    effectLevel.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('visually-hidden');
    return `grayscale(${parseInt(levelValue.value, 10) * 0.01})`;
  },
  sepia: () => {
    effectLevel.classList.remove('visually-hidden');
    return `sepia(${parseInt(levelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    effectLevel.classList.remove('visually-hidden');
    return `invert(${Math.floor(levelValue.value)}%)`;
  },
  phobos: () => {
    effectLevel.classList.remove('visually-hidden');
    return `blur(${(parseInt(levelValue.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('visually-hidden');
    return `brightness(${(parseInt(levelValue.value, 10) * 3) * 0.01})`;
  },
};

const onEffectRadioGroupClick = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      uploadPreviewImg.classList.remove(lastClass);
    }
    levelSlider.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
    const currentClass = evt.target.classList[1];
    lastClass = currentClass;

    uploadPreviewImg.classList.add(currentClass);
    uploadPreviewImg.style.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

effectsGroup.addEventListener('click', onEffectRadioGroupClick);

noUiSlider.create(levelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
  step:Slider.STEP,
});

levelSlider.noUiSlider.on('slide', () => {
  levelValue.value = Math.round(levelSlider.noUiSlider.get());

  uploadPreviewImg.style.filter = effects[lastClass.replace('effects__preview--', '')]();
});

const setDefaultLevel = () => {
  levelSlider.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
  levelValue.value = DEFAULT_EFFECT_LEVEL;
  effectLevel.classList.add('visually-hidden');
  uploadPreviewImg.style.filter = null;
  if (lastClass) {
    uploadPreviewImg.classList.remove(lastClass);
  }
};

export { setDefaultLevel };
