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
// console.log(document.documentElement); //all HTML document
// console.log(document.head);
// console.log(document.body);
const allSelections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

// console.log(allButtons); //HTMLCollection(9) - like an array[button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active]
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
  // the old way for do the same:
  // message.parentElement.removeChild(message)
});

/////////////////

// Styles, atributes and classes
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // = inline styles in HTML

// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// działa tylko dla stylów name zaimplementowanych liniowo w HTML

// console.log(getComputedStyle(message)); //uzyskamy wszystkie style
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); //zmieniamy zmienne CSS

// Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); //Bankist logo
// console.log(logo.src); //http://127.0.0.1:8080/img/logo.png
// console.log(logo.className);

logo.alt = 'Beautiful minimalist logo'; //changing slt atribute

// // Non-standart attribute
// console.log(logo.designer); //doesn't work
// console.log(logo.getAttribute('designer')); //work
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); //http://127.0.0.1:8080/img/logo.png - absolute
// console.log(logo.getAttribute('src')); //img/logo.png - relative, żywy url, zależny od lokalizacji foldera

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); //http://127.0.0.1:8080/#
// console.log(link.getAttribute('href')); //#

// Data attributes
// console.log(logo.dataset.versionNumber); //3.0

// Clases

// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'l');
// logo.classList.toggle('c');
// logo.classList.contains('c'); //not includes

// don't use
// logo.className = 'jonas'; //zastąpi wszystkie klassy

///////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //////////////////////////////////
  // Modern way
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// // Remove
// const h1 = document.querySelector('h1');

// const alertH1 = e => {
//   alert('addEventListener: Great! You are reading the heading :D');

// h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

// Old way
// h1.onmouseenter = e => {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

////////////////////////
// Event propagation
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // e.target - gdzie event się wydaży - nav__link
  //e.currentTarget - element którego dotyczy obecne wydarzenie(albo ten, albo rodzic)
  console.log(e.currentTarget === this); //true

  // Stop propagation - not a good idea
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget); //nav__links,
    // Stop propagation
    // e.stopPropagation();
  },
  true
);

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget); //nav
});
