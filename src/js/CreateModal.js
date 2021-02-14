export function createModal() {
  const body = document.querySelector('body');
  const modal = document.createElement('div');
  const menu = document.createElement('ul');
  const resumeGame = document.createElement('li');
  const newGame = document.createElement('li');
  const saveGame = document.createElement('li');
  const loadGame = document.createElement('li');
  const settingsGame = document.createElement('li');
  const resumeGameText = document.createElement('span');
  const newGameText = document.createElement('span');
  const saveGameText = document.createElement('span');
  const loadGameText = document.createElement('span');
  const settingsGameText = document.createElement('span');
  const winner = document.createElement('span');
  const bestScores = document.createElement('li');
  const bestScoresText = document.createElement('span');

  const RESUME_GAME = 'RESUME GAME';
  const NEW_GAME = 'NEW GAME';
  const LOAD_GAME = 'LOAD GAME';
  const SAVE_GAME = 'SAVE GAME';
  const SETTINGS_GAME = 'SETTINGS';
  const BEST_GAME = 'BEST SCORES';

  resumeGameText.textContent = RESUME_GAME;
  newGameText.textContent = NEW_GAME;
  loadGameText.textContent = LOAD_GAME;
  saveGameText.textContent = SAVE_GAME;
  settingsGameText.textContent = SETTINGS_GAME;
  bestScoresText.textContent = BEST_GAME;

  menu.classList.add('modal__menu', 'modal__menu_active');
  modal.classList.add('modal__wrapper', 'modal__wrapper_active', 'modal__wrapper_newWindow');
  resumeGame.classList.add('modal__resume');
  newGame.classList.add('modal__game');
  loadGame.classList.add('modal__load');
  saveGame.classList.add('modal__settings');
  settingsGame.classList.add('modal__save');
  resumeGameText.classList.add('modal__resume-text');
  newGameText.classList.add('modal__game-text');
  loadGameText.classList.add('modal__load-text');
  saveGameText.classList.add('modal__save-text');
  settingsGameText.classList.add('modal__settings-text');
  winner.classList.add('modal__winner');
  bestScoresText.classList.add('modal__best-text');

  resumeGame.append(resumeGameText);
  newGame.append(newGameText);
  loadGame.append(loadGameText);
  saveGame.append(saveGameText);
  settingsGame.append(settingsGameText);
  bestScores.append(bestScoresText);
  menu.append(resumeGame);
  menu.append(newGame);
  menu.append(loadGame);
  menu.append(saveGame);
  menu.append(settingsGame);
  menu.append(bestScores);
  modal.append(menu);
  modal.append(winner);
  body.append(modal);
  createSettingsModal();
  createBestScore();
}

export function activeModal() {
  const menu = document.querySelector('.modal__menu');
  const modal = document.querySelector('.modal__wrapper');
  const resume = document.querySelector('.modal__resume');
  if (!modal.classList.contains('modal__wrapper_newWindow')) {
    resume.classList.add('modal__resume_active');
  }
  modal.classList.toggle('modal__wrapper_active');
  menu.classList.toggle('modal__menu_active');
  modal.classList.remove('modal__wrapper_newWindow');
}

function createSettingsModal() {
  const wrapper = document.querySelector('.modal__wrapper');
  const settingsGameMenu = document.createElement('div');
  const settingsGameMenuList = document.createElement('ul');
  const three = document.createElement('li');
  const four = document.createElement('li');
  const five = document.createElement('li');
  const six = document.createElement('li');
  const seven = document.createElement('li');
  const eight = document.createElement('li');
  const back = document.createElement('div');
  const threeText = document.createElement('span');
  const fourText = document.createElement('span');
  const fiveText = document.createElement('span');
  const sixText = document.createElement('span');
  const sevenText = document.createElement('span');
  const eightText = document.createElement('span');

  settingsGameMenu.classList.add('settings__menu');
  settingsGameMenuList.classList.add('settings__menu-list');
  three.classList.add('settings__three');
  four.classList.add('settings__four');
  five.classList.add('settings__five');
  six.classList.add('settings__six');
  seven.classList.add('settings__seven');
  eight.classList.add('settings__eight');
  back.classList.add('settings__back');
  threeText.classList.add('settings__three-text');
  fourText.classList.add('settings__four-text');
  fiveText.classList.add('settings__five-text');
  sixText.classList.add('settings__six-text');
  sevenText.classList.add('settings__seven-text');
  eightText.classList.add('settings__eight-text');

  const SIZE_3x3 = '3x3';
  const SIZE_4x4 = '4x4';
  const SIZE_5x5 = '5x5';
  const SIZE_6x6 = '6x6';
  const SIZE_7x7 = '7x7';
  const SIZE_8x8 = '8x8';
  const BACK = 'BACK';

  threeText.textContent = SIZE_3x3;
  fourText.textContent = SIZE_4x4;
  fiveText.textContent = SIZE_5x5;
  sixText.textContent = SIZE_6x6;
  sevenText.textContent = SIZE_7x7;
  eightText.textContent = SIZE_8x8;
  back.textContent = BACK;

  three.append(threeText);
  four.append(fourText);
  five.append(fiveText);
  six.append(sixText);
  seven.append(sevenText);
  eight.append(eightText);
  settingsGameMenuList.append(three);
  settingsGameMenuList.append(four);
  settingsGameMenuList.append(five);
  settingsGameMenuList.append(six);
  settingsGameMenuList.append(seven);
  settingsGameMenuList.append(eight);
  settingsGameMenu.append(settingsGameMenuList);
  settingsGameMenu.append(back);
  wrapper.append(settingsGameMenu);
}

function createBestScore() {
  const wrapper = document.querySelector('.modal__wrapper');
  const bestScoreGameMenu = document.createElement('div');
  const back = document.createElement('div');
  const bestScoreGameMenuList = document.createElement('ol');

  bestScoreGameMenu.classList.add('bestScopes__menu');
  bestScoreGameMenuList.classList.add('bestScopes__menu_list');
  back.classList.add('bestScopes__back');

  const BACK = 'BACK';

  back.textContent = BACK;

  bestScoreGameMenu.append(bestScoreGameMenuList);
  bestScoreGameMenu.append(back);
  wrapper.append(bestScoreGameMenu);
}
