export function createElements(size = 16) {
  const body = document.querySelector('body');
  const main = document.createElement('div');
  const wrapper = document.createElement('div');
  const settings = document.createElement('div');
  const settingsLogo = document.createElement('span');
  const info = document.createElement('div');
  const time = document.createElement('div');
  const count = document.createElement('div');
  const soundImg = document.createElement('span');
  const audio = document.createElement('audio');
  const settingsImages = document.createElement('div');
  const imageImg = document.createElement('span');
  const settingsPicture = document.createElement('img');
  const volumePicture = document.createElement('img');
  const imagePicture = document.createElement('img');

  // Add class
  main.classList.add('puzzle');
  wrapper.classList.add('puzzle__wrapper');
  settings.classList.add('puzzle__settings');
  settingsImages.classList.add('puzzle__settingsImage');
  settingsLogo.classList.add('puzzle__settingsLogo');
  time.classList.add('puzzle__time');
  count.classList.add('puzzle__count');
  info.classList.add('puzzle__info');
  count.textContent = 'Step: 0';
  time.textContent = 'Time: 00:00';
  soundImg.classList.add('puzzle__sound', 'puzzle__sound_off');
  audio.classList.add('audio');
  audio.setAttribute('src', './assets/audio/tink.wav');
  imageImg.classList.add('puzzle__image', 'puzzle__image_off');
  settingsPicture.classList.add('puzzle__settings-images', 'puzzle__settings-images-settings');
  volumePicture.classList.add('puzzle__settings-images', 'puzzle__settings-images-sound');
  imagePicture.classList.add('puzzle__settings-images', 'puzzle__settings-images-image');
  settingsPicture.setAttribute('alt', 'settings');
  volumePicture.setAttribute('alt', 'sound');
  imagePicture.setAttribute('alt', 'image');
  settingsPicture.setAttribute('src', './assets/icons/settings-black-18dp.svg');
  volumePicture.setAttribute('src', './assets/icons/volume_off-black-18dp.svg');
  imagePicture.setAttribute('src', './assets/icons/image_not_supported-24px.svg');

  const fifteen = createStartArr(size);
  const shuffleFifteen = shuffle(fifteen);
  for (let i = 0; i < size; i += 1) {
    const button = document.createElement('div');
    button.classList.add('puzzle__button');
    if (shuffleFifteen[i] === '') {
      button.classList.add('puzzle__empty');
    }
    button.textContent = shuffleFifteen[i];

    wrapper.append(button);
  }

  imageImg.append(imagePicture);
  soundImg.append(volumePicture);
  settingsLogo.append(settingsPicture);
  settingsImages.append(imageImg);
  settingsImages.append(soundImg);
  settingsImages.append(settingsLogo);
  info.append(time);
  info.append(count);
  settings.append(settingsImages);
  settings.append(info);
  main.append(settings);
  main.append(wrapper);
  body.append(audio);
  body.append(main);

  return shuffleFifteen;
}

const COUNT_OF_SHUFFLE = 3000;
const SIZE_GAME_NINE = 9;
const SIZE_GAME_SIXTEEN = 16;
const SIZE_GAME_TWENTY_FIVE = 25;
const SIZE_GAME_THIRTY_SIX = 36;
const SIZE_GAME_FORTY_NINE = 49;
const SIZE_GAME_SIXTY_FOUR = 64;

export function shuffle(arr, size) {
  switch (size) {
    case SIZE_GAME_NINE:
      for (let i = 0; i < COUNT_OF_SHUFFLE; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 3];
        const bufferU = arr[idxOfZero - 3];

        switch (rand) {
          case 1:
            switch (idxOfZero) {
              case 0:
              case 3:
              case 6:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 3] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 3] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 2:
              case 5:
              case 8:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 6:
              case 7:
              case 8:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 3] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 3] = 0;
                break;
            }
            break;
        }
      }
      break;
    case SIZE_GAME_SIXTEEN:
      for (let i = 0; i < COUNT_OF_SHUFFLE; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 4];
        const bufferU = arr[idxOfZero - 4];

        switch (rand) {
          case 1:
            switch (idxOfZero) {
              case 0:
              case 4:
              case 8:
              case 12:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
              case 3:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 4] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 4] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 3:
              case 7:
              case 11:
              case 15:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 12:
              case 13:
              case 14:
              case 15:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 4] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 4] = 0;
                break;
            }
            break;
        }
      }
      break;
    case SIZE_GAME_TWENTY_FIVE:
      for (let i = 0; i < COUNT_OF_SHUFFLE; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 5];
        const bufferU = arr[idxOfZero - 5];

        switch (rand) {
          case 1:
            switch (idxOfZero) {
              case 0:
              case 5:
              case 10:
              case 15:
              case 20:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 5] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 5] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 4:
              case 9:
              case 14:
              case 19:
              case 24:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 20:
              case 21:
              case 22:
              case 23:
              case 24:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 5] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 5] = 0;
                break;
            }
            break;
        }
      }
      break;
    case SIZE_GAME_THIRTY_SIX:
      for (let i = 0; i < 3000; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 6];
        const bufferU = arr[idxOfZero - 6];

        switch (rand) {
          case 1:
            switch (idxOfZero) {
              case 0:
              case 6:
              case 12:
              case 18:
              case 24:
              case 30:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 6] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 6] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 5:
              case 11:
              case 17:
              case 23:
              case 29:
              case 35:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 30:
              case 31:
              case 32:
              case 33:
              case 34:
              case 35:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 6] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 6] = 0;
                break;
            }
            break;
        }
      }
      break;
    case SIZE_GAME_FORTY_NINE:
      for (let i = 0; i < COUNT_OF_SHUFFLE; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 7];
        const bufferU = arr[idxOfZero - 7];

        switch (rand) {
          case 1:
            switch (arr.indexOf(0)) {
              case 0:
              case 7:
              case 14:
              case 21:
              case 28:
              case 35:
              case 42:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 7] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 7] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 6:
              case 13:
              case 20:
              case 27:
              case 34:
              case 41:
              case 48:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 42:
              case 43:
              case 44:
              case 45:
              case 46:
              case 47:
              case 48:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 7] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 7] = 0;
                break;
            }
            break;
        }
      }
      break;
    case SIZE_GAME_SIXTY_FOUR:
      for (let i = 0; i < COUNT_OF_SHUFFLE; i += 1) {
        const rand = Math.ceil(Math.random() * 4);
        const idxOfZero = arr.indexOf(0);

        const bufferR = arr[idxOfZero + 1];
        const bufferL = arr[idxOfZero - 1];
        const bufferD = arr[idxOfZero + 8];
        const bufferU = arr[idxOfZero - 8];

        switch (rand) {
          case 1:
            switch (arr.indexOf(0)) {
              case 0:
              case 8:
              case 16:
              case 24:
              case 32:
              case 40:
              case 48:
              case 56:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
              default:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                break;
            }
            break;
          case 2:
            switch (idxOfZero) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 8] = 0;
                break;
              default:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 8] = 0;
                break;
            }
            break;
          case 3:
            switch (idxOfZero) {
              case 7:
              case 15:
              case 23:
              case 31:
              case 39:
              case 47:
              case 55:
              case 63:
                arr[idxOfZero - 1] = 0;
                arr[idxOfZero] = bufferL;
                arr[idxOfZero - 1] = 0;
                break;
              default:
                arr[idxOfZero] = bufferR;
                arr[idxOfZero + 1] = 0;
                break;
            }
            break;
          case 4:
            switch (idxOfZero) {
              case 56:
              case 57:
              case 58:
              case 59:
              case 60:
              case 61:
              case 62:
              case 63:
                arr[idxOfZero] = bufferU;
                arr[idxOfZero - 8] = 0;
                break;
              default:
                arr[idxOfZero] = bufferD;
                arr[idxOfZero + 8] = 0;
                break;
            }
            break;
        }
      }
      break;
  }
  arr[arr.indexOf(0)] = '';
  return arr;
}

export function createStartArr(size = 16) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push(i);
  }
  return result;
}
