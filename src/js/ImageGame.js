import { size } from './scrypt.js';
import { createStartArr } from './CreateGame.js';

let image;
export function imageGame() {
  const imagePicture = document.querySelector('.puzzle__settings-images-image');
  const imageLogo = document.querySelector('.puzzle__image_off');
  const changeImageLogo = function () {
    const buttons = document.querySelectorAll('.puzzle__button');
    imageLogo.classList.toggle('puzzle__image_on');
    buttons.forEach((button) => {
      button.classList.toggle('puzzle__button_image');
    });
    if (imageLogo.classList.contains('puzzle__image_on')) {
      imagePicture.setAttribute('src', './assets/icons/image-24px.svg');
    } else {
      imagePicture.setAttribute('src', './assets/icons/image_not_supported-24px.svg');
    }
  };

  const getImage = function () {
    function randomInteger(min, max) {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    image = randomInteger(1, 150);
  };

  imageLogo.addEventListener('click', changeImageLogo);
  imageLogo.addEventListener('click', getImage);
}

export function addImage() {
  const buttons = document.querySelectorAll('.puzzle__button');
  const imageLogo = document.querySelector('.puzzle__image');
  const setImage = `url('./assets/image/${image}.jpg')`;

  if (imageLogo.classList.contains('puzzle__image_on')) {
    buttons.forEach((button) => {
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      const buttonNumber = button.textContent;
      const lineSize = Math.sqrt(size);

      const left = buttonWidth * ((buttonNumber - 1) % lineSize);
      const top = buttonHeight * Math.floor((buttonNumber - 1) / (lineSize));

      button.style.backgroundImage = setImage;
      if (button.classList.contains('puzzle__empty')) {
        button.style.backgroundImage = 'none';
      }
      button.style.backgroundSize = `${buttonWidth * lineSize}px ${buttonHeight * lineSize}px`;
      button.style.backgroundPosition = `-${left}px -${top}px`;
    });
  } else {
    buttons.forEach((button) => {
      button.style.backgroundImage = 'none';
    });
  }
}
