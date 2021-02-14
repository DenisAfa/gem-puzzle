import { findNeighbours } from './FindNeighbours.js';
import { size } from './scrypt.js';
import { playSound } from './Sound.js';

export function dragAndDrop() {
  const buttons = document.querySelectorAll('.puzzle__button_move');
  const cell = document.querySelector('.puzzle__empty');
  let text;

  const dragStart = function () {
    setTimeout(() => {
      this.classList.add('puzzle__button_hide');
      text = this.textContent;
    }, 0);
  };

  const dragEnd = function () {
    this.classList.remove('puzzle__button_hide');
  };

  const dragOver = function (event) {
    event.preventDefault();
  };

  const dragDrop = function () {
    const buttonMove = document.querySelector('.puzzle__button_hide');
    const cell = document.querySelector('.puzzle__empty');
    setTimeout(() => {
      cell.classList.remove('puzzle__empty');
      cell.textContent = text;
      buttonMove.textContent = '';
      buttonMove.classList.add('puzzle__empty');
      findNeighbours(size);
      playSound();
    }, 0);
  };

  buttons.forEach((button) => {
    button.addEventListener('dragstart', dragStart);
    button.addEventListener('dragend', dragEnd);
  });

  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('drop', dragDrop);
}
