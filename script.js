'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// /////////////////
// notes
// /////////////////
// SELECTED ELEMENTS
console.log(document.documentElement); //all HTML document
console.log(document.head);
console.log(document.body);
const allSelections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //HTMLCollection(9) - like an array[button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active]
//na żywo onawia się informacja

document.getElementsByClassName('btn'); //HTMLCollection(9)

// /////////////////
// Creating and inaerting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>  ';
header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

/////////////////
// Delete element

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // the old way for do it:
  // message.parentElement.removeChild(message)
});

/////////////////
