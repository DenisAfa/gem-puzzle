import { createElements, createStartArr, shuffle } from './CreateGame.js';
import { findNeighbours } from './FindNeighbours.js';
import { createModal, activeModal } from './CreateModal.js';
import { dragAndDrop } from './DragAndDrop';
import { playSound } from './Sound.js';
import { imageGame, addImage } from './ImageGame.js';

window.onload = createElements();
window.onload = createModal();
window.onload = imageGame();
export let size = 16;
export let count = 0;

const SIZE_GAME_NINE = 9;
const SIZE_GAME_SIXTEEN = 16;
const SIZE_GAME_TWENTY_FIVE = 25;
const SIZE_GAME_THIRTY_SIX = 36;
const SIZE_GAME_FORTY_NINE = 49;
const SIZE_GAME_SIXTY_FOUR = 64;

const elements = document.querySelectorAll('.puzzle__button');
const buttons = document.querySelector('.puzzle__wrapper');
const countElement = document.querySelector('.puzzle__count');
const settings = document.querySelector('.puzzle__settings');
const imageLogo = document.querySelector('.puzzle__image');
const winners = {

};

function changeItem(event) {
  const [empty, neighbours] = findNeighbours(size);
  const { target } = event;

  if (neighbours.includes(target)) {
    const emptyTop = empty.getBoundingClientRect().top;
    const emptyLeft = empty.getBoundingClientRect().left;
    const targetDistanceTop = target.getBoundingClientRect().top;
    const targetDistanceLeft = target.getBoundingClientRect().left;

    if ((targetDistanceTop - emptyTop) === 0) {
      if ((targetDistanceLeft - emptyLeft) > 0) {
        let pageY = target.offsetWidth;
        function moveLeft() {
          if (pageY === 0) {
            clearInterval(time);
          } else {
            pageY--;
            empty.style.left = `${pageY}px`;
          }
        }
        let time = setInterval(moveLeft, 1);
      } else {
        let pageY = -target.offsetWidth;
        function moveRight() {
          if (pageY === 0) {
            clearInterval(time);
          } else {
            pageY++;
            empty.style.left = `${pageY}px`;
          }
        }
        let time = setInterval(moveRight, 1);
      }
    } else if ((targetDistanceTop - emptyTop) !== 0) {
      if ((targetDistanceTop - emptyTop) > 0) {
        let pageX = target.offsetHeight;
        function moveUp() {
          if (pageX === 0) {
            clearInterval(time);
          } else {
            pageX--;
            empty.style.top = `${pageX}px`;
          }
        }
        let time = setInterval(moveUp, 1);
      } else {
        let pageX = -target.offsetHeight;
        function moveDown() {
          if (pageX === 0) {
            clearInterval(time);
          } else {
            pageX++;
            empty.style.top = `${pageX}px`;
          }
        }
        let time = setInterval(moveDown, 1);
      }
    }

    setTimeout(() => {
      const buffer = target.innerHTML;
      target.innerHTML = '';
      target.classList.add('puzzle__empty');
      empty.classList.remove('puzzle__empty');
      empty.innerHTML = buffer;
      findNeighbours(size);
      dragAndDrop();
      playSound();
    }, 0);
    count += 1;
    countElement.innerHTML = `Step: ${count}`;
  }
}

// Вывод времени

const outTimer = document.querySelector('.puzzle__time');
const menu = document.querySelector('.modal__menu');
let timerId;
let pauseTime = 0;
let startTime = Math.floor(Date.now() / 1000);
let timer = 0;

function showTime() {
  const nowTime = Math.floor(Date.now() / 1000);

  timer = (nowTime - startTime) + pauseTime;
  let seconds = (timer) % 60;
  let minutes = Math.floor((timer) / 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  outTimer.innerHTML = `Time: ${minutes}:${seconds}`;
}
if (!(menu.classList.contains('modal__menu_active'))) {
  timerId = setInterval(showTime, 1000);
}

function pauseTimer() {
  if (menu.classList.contains('modal__menu_active')) {
    clearInterval(timerId);
  } else {
    startTime = Math.floor(Date.now() / 1000);
    pauseTime = timer;
    timerId = setInterval(showTime, 1000);
  }
}

// Сохранение игры
const load = document.querySelector('.modal__load-text');
const save = document.querySelector('.modal__save-text');
const newGameMenu = document.querySelector('.modal__game-text');

function saveGame() {
  const elements = document.querySelectorAll('.puzzle__button');
  const arrShuffleElements = [];

  for (const element of elements) {
    arrShuffleElements.push(Number(element.innerHTML));
  }
  arrShuffleElements[arrShuffleElements.indexOf(0)] = '';

  localStorage.setItem('time', timer);
  localStorage.setItem('game', arrShuffleElements);
  localStorage.setItem('count', count);
}

function resumeGame() {
  const elements = document.querySelectorAll('.puzzle__button');
  startTime = Math.floor(Date.now() / 1000);
  pauseTime = +localStorage.getItem('time');
  timerId = setInterval(showTime, 1000);

  count = localStorage.getItem('count');
  countElement.innerHTML = `Step: ${count}`;

  const [empty, neighbours] = findNeighbours(size);

  const memoryArr = localStorage.getItem('game').split(',');
  const arrShuffleElements = [];
  for (const elem of memoryArr) {
    arrShuffleElements.push(+elem);
  }
  arrShuffleElements[arrShuffleElements.indexOf(0)] = '';
  for (const elem of elements) {
    wrapperSize.removeChild(elem);
  }
  for (let i = 0; i <= arrShuffleElements.length; i += 1) {
    if (arrShuffleElements[i] === '') {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.classList.add('puzzle__empty');
      button.textContent = arrShuffleElements[i];
      wrapperSize.append(button);
    } else if (arrShuffleElements[i] === undefined) {
    } else {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.textContent = arrShuffleElements[i];
      if (neighbours.includes(button)) {
        button.classList.add('.puzzle__button_move');
        button.setAttribute('draggable', 'true');
      }
      wrapperSize.append(button);
    }
  }
  switch (arrShuffleElements.length) {
    case SIZE_GAME_NINE:
      wrapperSize.classList.add('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_SIXTEEN:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_TWENTY_FIVE:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.add('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_THIRTY_SIX:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.add('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_FORTY_NINE:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.add('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_SIXTY_FOUR:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.add('puzzle__wrapper_eight');
      break;
  }

  size = arrShuffleElements.length;
  dragAndDrop();
}

const settingsGameMenu = document.querySelector('.modal__settings-text');
const settingsGameWindow = document.querySelector('.settings__menu');
const backSettingsGameMenu = document.querySelector('.settings__back');
const wrapperSize = document.querySelector('.puzzle__wrapper');
const modal = document.querySelector('.modal__wrapper');
const settingSizeList = document.querySelector('.settings__menu-list');

settingsGameMenu.addEventListener('click', () => {
  menu.classList.remove('modal__menu_active');
  settingsGameWindow.classList.add('settings__menu_active');
});
backSettingsGameMenu.addEventListener('click', () => {
  menu.classList.add('modal__menu_active');
  settingsGameWindow.classList.remove('settings__menu_active');
});

settingSizeList.addEventListener('click', (event) => {
  size = (Number(event.target.textContent[0])) ** 2;
  switch (size) {
    case SIZE_GAME_NINE:
      wrapperSize.classList.add('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_SIXTEEN:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_TWENTY_FIVE:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.add('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_THIRTY_SIX:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.add('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_FORTY_NINE:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.add('puzzle__wrapper_seven');
      wrapperSize.classList.remove('puzzle__wrapper_eight');
      break;
    case SIZE_GAME_SIXTY_FOUR:
      wrapperSize.classList.remove('puzzle__wrapper_three');
      wrapperSize.classList.remove('puzzle__wrapper_five');
      wrapperSize.classList.remove('puzzle__wrapper_six');
      wrapperSize.classList.remove('puzzle__wrapper_seven');
      wrapperSize.classList.add('puzzle__wrapper_eight');
      break;
  }
  const elements = document.querySelectorAll('.puzzle__button');
  const fifteen = createStartArr(size);
  const shuffleFifteen = shuffle(fifteen, size);
  for (const elem of elements) {
    wrapperSize.removeChild(elem);
  }
  for (let i = 0; i <= shuffleFifteen.length; i += 1) {
    if (shuffleFifteen[i] === '') {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.classList.add('puzzle__empty');
      button.textContent = shuffleFifteen[i];
      wrapperSize.append(button);
    } else if (shuffleFifteen[i] === undefined) {
    } else {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.textContent = shuffleFifteen[i];
      wrapperSize.append(button);
    }
  }
  menu.classList.remove('modal__menu_active');
  settingsGameWindow.classList.remove('settings__menu_active');
  modal.classList.remove('modal__wrapper_active');
  pauseTime = 0;
  count = 0;
  countElement.innerHTML = `Step: ${count}`;
  startTime = Math.floor(Date.now() / 1000);
  timerId = setInterval(showTime, 1000);
  findNeighbours(size);
  dragAndDrop();
});

// Вывод информации победы

const bestScoreGameMenu = document.querySelector('.bestScopes__menu');
const bestScoreGameMenuList = document.querySelector('.bestScopes__menu_list');

const winner = function () {
  const elements = document.querySelectorAll('.puzzle__button');
  const finishResultArr = [];
  for (let i = 1; i < size; i += 1) {
    finishResultArr.push(i);
  }
  finishResultArr.push('');
  const arrShuffleElements = [];
  for (const element of elements) {
    arrShuffleElements.push(Number(element.innerHTML));
  }
  arrShuffleElements[arrShuffleElements.indexOf(0)] = '';
  if (arrShuffleElements.join() === finishResultArr.join()) {
    const winner = document.querySelector('.modal__winner');
    const modal = document.querySelector('.modal__wrapper');
    const resumeThisGame = document.querySelector('.modal__resume');
    const winnerMan = prompt('Enter your name');
    winner.innerHTML = `Congratulations ${winnerMan}. You win. Your time ${timer} sec, your moves ${count}`;
    winners[winnerMan] = count;
    modal.classList.add('modal__wrapper_winner');
    resumeThisGame.classList.remove('modal__resume_active');
    const winnersArr = Object.entries(winners).sort((a, b) => a[1] - b[1]);
    localStorage.setItem('winners', winnersArr);
    clearInterval(timerId);
    activeModal();
  }
};

const bestPlayers = function () {
  const winnerPlayers = document.querySelectorAll('.bestScopes__winner');
  const bestScoreGameMenuList = document.querySelector('.bestScopes__menu_list');
  menu.classList.remove('modal__menu_active');
  bestScoreGameMenu.classList.add('bestScopes__menu_active');

  const winnersBest = localStorage.getItem('winners').split(',');
  const winnersArrBestTen = winnersBest.slice(0, 10);
  console.log(winnersBest);

  for (const elem of winnerPlayers) {
    bestScoreGameMenuList.removeChild(elem);
  }

  for (let i = 0; i < winnersArrBestTen.length; i += 1) {
    if (i % 2 === 0) {
      const winner = document.createElement('li');
      winner.textContent = `${winnersArrBestTen[i]}: ${winnersArrBestTen[i + 1]}`;
      winner.classList.add('bestScopes__winner');
      bestScoreGameMenuList.append(winner);
    }
  }
};

const settingsLogo = document.querySelector('.puzzle__settingsLogo');
const resumeThisGame = document.querySelector('.modal__resume');
const bestScores = document.querySelector('.modal__best-text');
const backBestScores = document.querySelector('.bestScopes__back');

// Действия
bestScores.addEventListener('click', bestPlayers);
backBestScores.addEventListener('click', () => {
  menu.classList.add('modal__menu_active');
  bestScoreGameMenu.classList.remove('bestScopes__menu_active');
});

load.addEventListener('click', () => findNeighbours(size));
load.addEventListener('click', resumeGame);
load.addEventListener('click', activeModal);

save.addEventListener('click', saveGame);
save.addEventListener('click', activeModal);
save.addEventListener('click', pauseTimer);

resumeThisGame.addEventListener('click', activeModal);
resumeThisGame.addEventListener('click', pauseTimer);
settingsLogo.addEventListener('click', activeModal);
settingsLogo.addEventListener('click', pauseTimer);
setTimeout(() => {
  imageLogo.addEventListener('click', addImage);
}, 0);
bestScores.addEventListener('click', bestPlayers);

newGameMenu.addEventListener('click', () => {
  count = 0;
  countElement.innerHTML = `Step: ${count}`;
  const elements = document.querySelectorAll('.puzzle__button');
  const fifteen = createStartArr(size);
  const shuffleFifteen = shuffle(fifteen, size);
  for (const elem of elements) {
    wrapperSize.removeChild(elem);
  }
  for (let i = 0; i <= shuffleFifteen.length; i += 1) {
    if (shuffleFifteen[i] === '') {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.classList.add('puzzle__empty');
      button.textContent = shuffleFifteen[i];
      wrapperSize.append(button);
    } else if (shuffleFifteen[i] === undefined) {
    } else {
      const button = document.createElement('div');
      button.classList.add('puzzle__button');
      button.textContent = shuffleFifteen[i];
      wrapperSize.append(button);
    }
  }
});
newGameMenu.addEventListener('click', activeModal);
newGameMenu.addEventListener('click', () => {
  const winner = document.querySelector('.modal__winner');
  const modal = document.querySelector('.modal__wrapper');
  const resumeThisGame = document.querySelector('.modal__resume');
  clearTimeout(timerId);
  pauseTime = 0;
  startTime = Math.floor(Date.now() / 1000);
  timerId = setInterval(showTime, 1000);
  findNeighbours(size);
  dragAndDrop();
  playSound();
  winner.innerHTML = '';
  modal.classList.remove('modal__wrapper_winner');
  resumeThisGame.classList.add('modal__wrapper_active');
});

buttons.addEventListener('click', changeItem);
buttons.addEventListener('click', playSound);
buttons.addEventListener('click', () => setTimeout(addImage, 0));
buttons.addEventListener('click', dragAndDrop);
buttons.addEventListener('click', () => setTimeout(winner, 100));

buttons.addEventListener('drop', () => setTimeout(dragAndDrop, 0));
buttons.addEventListener('drop', () => findNeighbours(size));
buttons.addEventListener('drop', () => {
  count += 1;
  countElement.innerHTML = `Step: ${count}`;
});
buttons.addEventListener('drop', playSound);
buttons.addEventListener('drop', () => setTimeout(addImage, 0));
buttons.addEventListener('drop', () => setTimeout(winner, 0));
