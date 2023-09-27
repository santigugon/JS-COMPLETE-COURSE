'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');
///////////////////////////////////////
// const getCountryAndNeighbourData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);

//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //Data2
//     console.log(neighbour);

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

const renderCountry = function (data, className = '') {
  const html = `    <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️${data.languages[0].name}</span>LANG</p>
    <p class="country__row"><span>💰${data.currencies[0].name}</span>CUR</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  countriesContainer.style.opacity = 1;
};

// getCountryAndNeighbourData('russia');

//PROMISES

const request = fetch(`https://restcountries.com/v2/alpha/USA`);

const getCountryData = function (country) {
  country = country.toLowerCase();
  console.log(country);

  jsonHandler(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      const neighbour = data[0].borders?.[0];
      renderCountry(data[0]);
      if (!neighbour) throw new Error('No neighbour found');
      return jsonHandler(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Not neighbour'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`The error is ${err}`);
      renderError(err);
    });
};

const asyncgetCountryData = async function (country) {
  country = country.toLowerCase();

  const json = await jsonHandler(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found'
  );

  const neighbour = json[0].borders?.[0];
  renderCountry(json[0]);
  if (!neighbour) throw new Error('No neighbour found');
  else {
    const neighbourJson = await jsonHandler(
      `https://restcountries.com/v2/alpha/${neighbour}`,
      'Not neighbour'
    );
    renderCountry(neighbourJson, 'neighbour');
  }
};

const renderError = function (message) {
  console.error(message);
  images.insertAdjacentText(
    'beforeend',
    `ERROR MESSAGE: ${message} Try again!`
  );
  images.style.opacity = 1;
};

const jsonHandler = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

//Coding CHALLENGE 1
// btn.addEventListener('click', function () {
//   navigator.geolocation.getCurrentPosition(reverseGeoCoding, function () {
//     alert('Could not get current position');
//   });
// });

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const reverseGeoCoding = function () {
  getPosition()
    .then(pos => {
      const { coords } = pos;
      const { latitude } = coords;
      const { longitude } = coords;
      console.log(latitude, longitude);
      return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Wait for the page to cool down');

      return response.json();
    })
    .then(data => getCountryData(data.country))
    .catch(err => renderError(err));
};

const getLocation = function () {};

// Coding Challenge #2

// function createImage() {}

// const imageElement = document.querySelector('.images');

// for (let i = 0; i <= 2; i++) {
//   imageElement.src = `img/img-1.jpg`;

//   function showImage() {
//     return new Promise(resolve => {
//       imageElement.style.display = 'block';
//       resolve();
//     });
//   }

//   function hideImage() {
//     return new Promise(resolve => {
//       imageElement.style.display = 'none';
//       resolve();
//     });
//   }

//   showImage().then(() => {
//     setTimeout(() => {
//       hideImage();
//     }, 2000);
//   });
// }

let currentImage;
//Coding Challenge 2
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;
    currentImage = img;
    img.classList.add('parallel');

    img.addEventListener('load', function () {
      images.appendChild(img);
      console.log('QUEE?');

      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  })
    .then(img =>
      setTimeout(function () {
        img.remove();
        if (i < 3) i++;
        if (i == 3) i = 1;
        3;

        createImage(`img/img-${i}.jpg`);
      }, 2000)
    )
    .catch(err => console.error(err));
}
let i = 1;

// createImage(`img/img-${i}.jpg`);
async function whereAmIAsync() {
  try {
    const position = await getPosition();
    const { coords } = position;
    const { latitude } = coords;
    const { longitude } = coords;

    console.log(position);

    if (!position) throw new Error('Could not get your positiion');

    const countryAPI = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );
    console.log(countryAPI.ok);

    if (!countryAPI.ok) throw new Error('Could not get country data');

    const countryJson = await countryAPI.json();
    console.log(countryJson);
    const country = countryJson.country;

    const countryRender = await asyncgetCountryData(country);

    return country;
  } catch (err) {
    renderError(err);
    throw err;
  }
}
btn.addEventListener('click', whereAmIAsync);

async function returningValuesAsync() {
  try {
    const mainFunc = await whereAmIAsync();
    console.log(mainFunc);
    console.log('Finished getting location!');
  } catch (err) {
    renderError(err);
  }
}

// returningValuesAsync();

function wait(s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(s, 'seconds');

      resolve();
    }, s * 1000);
  });
}
// Coding challenge 3
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;
    currentImage = img;

    img.addEventListener('load', function () {
      images.appendChild(img);
      console.log('QUEE?');

      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
}
const loadNPause = async function () {
  try {
    for (let i = 1; i <= 3; i++) {
      const image = await createImage(`img/img-${i}.jpg`);
      console.log(image);

      await wait(2);
      image.remove();
    }
  } catch (error) {
    renderError(error);
  }
};
// loadNPause();

const loadAll = async function () {
  let imgArr = [`img/img-${1}.jpg`, `img/img-${2}.jpg`, `img/img-${3}.jpg`];
  //let imgs = imgArr.map(imgUrl => createImage(imgUrl));
  // console.log(imgs);
  let combinatorImgs = Promise.all(
    imgArr.map(img => {
      createImage(img);
      // img.classList.add('parallel');
    })
  );
};
loadAll();
