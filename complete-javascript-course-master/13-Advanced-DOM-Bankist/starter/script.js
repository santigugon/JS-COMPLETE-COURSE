'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const s1coords = section1.getBoundingClientRect();
const nav = document.querySelector('.nav');
const header = document.querySelector('.header__title');
const headerCoords = header.getBoundingClientRect();
const navLogo = document.querySelector('.nav__logo');
const sections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const dotContainer = document.querySelector('.dots');

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

//for (let i = 0; i < btnsOpenModal.length; i++)
//btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//document.documentElement.style.setProperty('--color-primary', 'yellow');
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

const learnMoreBtn = document.querySelector('.btn--scroll-to');

learnMoreBtn.addEventListener('click', function () {
  //window.scrollTo(0, 850);
  //behavior: 'smooth';
  section1.scrollIntoView({ behavior: 'smooth' });
});

const sectionTitle = document.querySelector('.section__title');
const navLinks = document.querySelector('.nav__links');
const mouseHover = function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target;
    const siblings = id.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);

    siblings.forEach(el => {
      if (el != id) {
        el.style.opacity = this;
      }
    });
  }
};

navLinks.addEventListener('mouseover', mouseHover.bind(0.5));
navLinks.addEventListener('mouseout', mouseHover.bind(1));

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TAB COMPONENT

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  tabs.forEach(e => e.classList.remove('operations__tab--active'));
  tabsContent.forEach(e => e.classList.remove('operations__content--active'));

  console.log(tabsContainer.children);

  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  const active = clicked.getAttribute('data-tab');
  console.log(active);
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(e => {
    if (e.classList.contains(`operations__content--${active}`)) {
      e.classList.add('operations__content--active');
    }
  });

  window.addEventListener('scroll', function () {
    if (s1coords.top < window.scrollY) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });

  console.log(clicked);
});

navLogo.addEventListener('click', function () {
  header.scrollIntoView({ behavior: 'smooth' });
});

const stickNav = entries => {
  const [entry] = entries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
  console.log(entry.isIntersecting);
};

const obsOptions = {
  root: null,
  threshold: 0.4,
};

//REVEALING IMAGES

const observer = new IntersectionObserver(stickNav, obsOptions);
observer.observe(header);

sections.forEach(el => {
  const slideImg = entries => {
    const [entry] = entries;
    entry.isIntersecting ? el.classList.remove('section--hidden') : '';
  };
  const observer = new IntersectionObserver(slideImg, {
    root: null,
    threshold: 0.2,
  });
  observer.observe(el);
});

//LAZY LOADING IMAGES

const loadImg = entries => {
  const [entry] = entries;
  console.log(entry);

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imageObserver.observe(img));

//SLIDER
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

slides.forEach((s, i) => {
  return (s.style.transform = `translateX(${i * 100}%)`);
  console.log(s.style.transform);
});

let counter = 0;

const changeSlide = function (slide) {
  counter = slide;
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
    highlightDot(counter);
  });
};

btnRight.addEventListener('click', function () {
  counter === slides.length - 1 ? (counter = 0) : counter++;
  changeSlide(counter);
});

btnLeft.addEventListener('click', function () {
  counter === 0 ? (counter = slides.length - 1) : counter--;
  changeSlide(counter);
});

document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowRight':
      counter === slides.length - 1 ? (counter = 0) : counter++;
      changeSlide(counter);
      break;
    case 'ArrowLeft':
      counter === 0 ? (counter = slides.length - 1) : counter--;
      changeSlide(counter);
      highlightDot(counter);
      break;
  }
});

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    changeSlide(slide);
  }
});

const highlightDot = function (slide) {
  dotContainer.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
    let curr = dot.dataset.slide;

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  });
};
highlightDot(counter);
