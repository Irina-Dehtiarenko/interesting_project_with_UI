'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////
// Scroling

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

///////////////////////////////////
// Page navigation:

// Mało wydajne rozwiązanie:

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

///////////////////////////////
// Event delegation:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////
//Tabbed compoonent

// Bad practice:
// tabs.forEach(t =>
//   t.addEventListener('click', () => {
//     console.log('TAB');
//   })
// );

// Better practice:
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active clases
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// /////////////////
// Menu fade animation

// const handleHover = function (e, opacity) {
// w drugim przypadku e  - domyślny parametr, i dodatkowo możemy dodać tylko jeden parametr, którym będzie 'this'
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const silblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    silblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// /////////////////
// Sticky navigation

// With the scroll event - małowydajny
// const initialCoords = section1.getBoundingClientRect();

// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// //////////////////////////////////////////////////
// Sticky navigation:Intersection Observer Api
// Examples:

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], //procenty które chcemy żeby były widoczne, zanim się wykona funkcja, [0 - odrazu jak się pojawi sekcja1, 0.2 - 20% widocznych od sekcji1]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// Using:
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry.isIntersecting);

  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //jak tylko element robi się niewidoczny
  rootMargin: `-${navHeight}px`, //'-90px', //określa dodatkową pozycję w której zacznie wywołanie funkcja(w tym przypadku 90px to jest height naszej navigacji, która powinna się pojawić), % nie działa
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');//ten sposób małowydajny
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    // zniknie tylko jak strona się załaduje
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //żeby obrazki ladowali się wcześniej niż obrazek się pojawi, chociaż mi się podoba taki efekt z pojawianiem się
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////
// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0; //% of translate
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible'; //żeby zobaczyć obrazki

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));//to samo co goToSlide(0)
// 0%, 100%, 200%, 300%

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);
// Go to next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  // curSlide++;
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
///CurrentSlide =  -100%, 0 , 100%, 200%
btnLeft.addEventListener('click', prevSlide);

// /////////////////
// notes
// ///////////////////////////////////////////////////////////////////////
// SELECTED ELEMENTS
// console.log(document.documentElement); //all HTML document
// console.log(document.head);
// console.log(document.body);
// const allSelections = document.querySelectorAll('.section');
// const header = document.querySelector('.header');
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');

// console.log(allButtons); //HTMLCollection(9) - like an array[button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active]
//na żywo onawia się informacja

// document.getElementsByClassName('btn'); //HTMLCollection(9)

// /////////////////
// Creating and inaerting elements
// .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics'
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>  ';
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

/////////////////
// Delete element

// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove();
//   // the old way for do the same:
//   // message.parentElement.removeChild(message)
// });

/////////////////

// Styles, atributes and classes
// Styles
// message.style/width = '120%'; // = inline styles in HTML

// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// działa tylko dla stylów name zaimplementowanych liniowo w HTML

// console.log(getComputedStyle(message)); //uzyskamy wszystkie style
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); //zmieniamy zmienne CSS

// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); //Bankist logo
// console.log(logo.src); //http://127.0.0.1:8080/img/logo.png
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo'; //changing slt atribute

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
// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   // e.target - gdzie event się wydaży - nav__link
//   //e.currentTarget - element którego dotyczy obecne wydarzenie(albo ten, albo rodzic)
//   console.log(e.currentTarget === this); //true

//   // Stop propagation - not a good idea
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target, e.currentTarget); //nav__links,
//     // Stop propagation
//     // e.stopPropagation();
//   },
//   true
// );

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget); //nav
// });

///////////////////////////////////////////////////
// DOM traversing

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwords: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
