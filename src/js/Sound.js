export const playSound = function () {
  const soundImg = document.querySelector('.puzzle__settings-images-sound');
  const sound = document.querySelector('.puzzle__sound_off');
  const audio = document.querySelector('.audio');
  sound.addEventListener('click', () => {
    sound.classList.toggle('puzzle__sound_on');
    if (sound.classList.contains('puzzle__sound_on')) {
      soundImg.setAttribute('src', './assets/icons/volume_up-black-18dp.svg');
    } else if ((sound.classList.contains('puzzle__sound_off'))) {
      soundImg.setAttribute('src', './assets/icons/volume_off-black-18dp.svg');
    }
  });

  if (sound.classList.contains('puzzle__sound_on')) {
    audio.play();
  }
};
