// Find neighbours of empty element

export function findNeighbours(size) {
  const elements = document.querySelectorAll('.puzzle__button');
  const neighbours = [];
  const rowSize = Math.sqrt(size);
  let empty;
  for (let i = 0; i < elements.length; i += 1) {
    if (elements[i].textContent === '') {
      empty = elements[i];
      if (elements[i - 1] && i !== rowSize && i !== (rowSize * 2) && i !== (rowSize * 3)) {
        neighbours.push(elements[i - 1]);
      }
      if (elements[i + 1] && i !== (rowSize - 1) && i !== ((rowSize * 2) - 1) && i !== ((rowSize * 3) - 1)) {
        neighbours.push(elements[i + 1]);
      }
      if (elements[(i - rowSize)]) {
        neighbours.push(elements[(i - rowSize)]);
      }
      if (elements[(i + rowSize)]) {
        neighbours.push(elements[(i + rowSize)]);
      }
    }
  }
  elements.forEach((elem) => {
    if (neighbours.includes(elem)) {
      elem.setAttribute('draggable', 'true');
      elem.classList.add('puzzle__button_move');
    } else {
      elem.setAttribute('draggable', 'false');
      elem.classList.remove('puzzle__button_move');
    }
  });

  return [empty, neighbours];
}
