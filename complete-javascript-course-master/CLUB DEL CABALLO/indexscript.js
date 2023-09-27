const hamburgerBars = document.querySelector(".hamburger__bars");
const hamburgerNav = document.querySelector(".hamburger__nav");
const topburgerNav = document.querySelector(".topburger__nav");
const navLinks = document.querySelector(".nav__links");
const dotContainer = document.querySelector(".dots");
// const sliderText = document.querySelector("slider__text");
///////////////////////////////////////

// Modal window

let hamburguerClicked = 0;

const mobileHamburger = function () {
  hamburgerNav.classList.contains("hidden__nav")
    ? hamburgerNav.classList.remove("hidden__nav")
    : hamburgerNav.classList.add("hidden__nav");
};

const mouseHover = function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target;
    const siblings = id.closest(".nav").querySelectorAll(".nav__link");
    console.log(siblings);

    siblings.forEach((el) => {
      if (el != id) {
        el.style.opacity = this;
      }
    });
  }
};

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

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

btnRight.addEventListener("click", function () {
  counter === slides.length - 1 ? (counter = 0) : counter++;
  changeSlide(counter);
});

btnLeft.addEventListener("click", function () {
  counter === 0 ? (counter = slides.length - 1) : counter--;
  changeSlide(counter);
});

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      counter === slides.length - 1 ? (counter = 0) : counter++;
      changeSlide(counter);
      break;
    case "ArrowLeft":
      counter === 0 ? (counter = slides.length - 1) : counter--;
      changeSlide(counter);
      highlightDot(counter);
      break;
  }
});

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    changeSlide(slide);
  }
});

const highlightDot = function (slide) {
  dotContainer.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
    let curr = dot.dataset.slide;

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  });
};
highlightDot(counter);

// Touch slide
window.addEventListener("load", function () {
  // startX, startY;
});

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 100) {
      /* right swipe */
      counter === 0 ? (counter = slides.length - 1) : counter--;
      changeSlide(counter);
    } else {
      /* left swipe */
      counter === slides.length - 1 ? (counter = 0) : counter++;
      changeSlide(counter);
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
