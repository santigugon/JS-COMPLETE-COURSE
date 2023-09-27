'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClassModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnClassModal.length; i++)
  btnClassModal[i].addEventListener('click', function () {
    console.log('click');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.querySelector('.close-modal').addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
