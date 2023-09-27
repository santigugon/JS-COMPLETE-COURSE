'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');

const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// const map = document.getElementById('map');
const map = L.map('map');
const botonAgregar = document.querySelector('.botonprueba1');
const botonQuitar = document.querySelector('.botonprueba2');
const now = new Date();
const resetBtn = document.querySelector('.reset__btn');
const editBtn = document.querySelector('.edit__btn');
const eraseBtn = document.querySelector('.erase__btn');
const formBtn = document.querySelector('.form__btn');
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};
const workoutElement = document.querySelector('.workout');
const sateliteImg = document.querySelector('#satelite');
const relieveImg = document.querySelector('#relieve');
const findMe = document.querySelector('#findMe');

let Id;
let trainingType;
let popUpContent;
let lastTraining;
let workoutsObj = [];
let mapEvent;
let mapType;
let swappingTypes = false;
let editingWorkout;
let editingTime = false;
// const locale = navigator.language;
// console.log(locale);
//console.log(localStorage.getItem('workout'));

const prueba = e => {};

const editionWorkout = function () {};

class App {
  constructor() {
    this._getLocalStorage();
    this._getPosition();
    workoutsObj.forEach(workout => this._markerRender(workout));
    this._toggleElevationField();
    map.on('click', this._showForm);
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopUp);
    resetBtn.addEventListener('click', this._resetLocalStorage);
    editBtn.addEventListener('click', this._showEditForm);
    eraseBtn.addEventListener('click', this._deleteWorkout);

    sateliteImg.addEventListener(
      'click',
      function () {
        mapType = 1;

        localStorage.removeItem('mapType');
        localStorage.setItem('mapType', JSON.stringify(mapType));

        swappingTypes = true;
        this._getPosition();
      }.bind(this)
    );

    relieveImg.addEventListener(
      'click',
      function () {
        mapType = 0;

        localStorage.removeItem('mapType');
        localStorage.setItem('mapType', JSON.stringify(mapType));

        swappingTypes = true;
        this._getPosition();
      }.bind(this)
    );

    findMe.addEventListener(
      'click',
      function () {
        swappingTypes = false;
        this._getPosition();
      }.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert('Could not get current position');
      });
    }
  }

  _loadMap(position) {
    let { latitude } = position.coords;
    let { longitude } = position.coords;

    let coords = [latitude, longitude];

    if (!swappingTypes) map.setView(coords, 20);

    if (!mapType) {
      mapType = 0;
    }

    if (mapType == 0) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    } else if (mapType == 1) {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      ).addTo(map);
    }
  }
  _showForm(mapE) {
    inputType.classList.remove('hidden__option');
    mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();

    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  _newWorkout(e) {
    if (editingTime) return;
    let popUpClass;
    let mark = false;

    e.preventDefault();
    const { lat, lng } = mapEvent.latlng;
    const clickCoords = [lat, lng];
    if (
      !inputCadence
        .closest('.form__row')
        .classList.contains('form__row--hidden')
    ) {
      if (!Id) {
        Id = 0;
      }

      if (
        inputDistance.value > 0 &&
        inputDuration.value > 0 &&
        inputCadence.value > 0
      ) {
        workoutsObj.push(
          (lastTraining = new Running(
            Id,
            inputDistance.value,
            inputDuration.value,
            clickCoords,
            inputCadence.value
          ))
        );
        Id += 1;
        trainingType = 'running';

        popUpContent = ` 🏃‍♂️${lastTraining.description}`;
        popUpClass = 'running-popup';
        this._workoutRender(lastTraining);
        mark = true;
      } else {
        alert('Please enter positive values');
      }
    } else if (
      !inputElevation
        .closest('.form__row')
        .classList.contains('form__row--hidden')
    ) {
      if (!Id) {
        Id = 0;
      }
      if (inputDistance.value > 0 && inputDuration.value > 0) {
        workoutsObj.push(
          (lastTraining = new Cycling(
            Id,
            inputDistance.value,
            inputDuration.value,
            clickCoords,
            inputElevation.value
          ))
        );
        Id += 1;
        trainingType = 'cycling';
        this._workoutRender(lastTraining);

        popUpContent = `🚴 ${lastTraining.description} `;
        popUpClass = 'cycling-popup';
        mark = true;
      } else {
        alert('Please enter a positive value');
      }
    }
    form.classList.add('hidden');

    this._markerRender(lastTraining);
    this._setLocalStorage();
  }

  _editWorkout = e => {
    if (!editingTime) return;
    eraseBtn.classList.remove('hidden__option');
    form.addEventListener('submit', this._infoModifyWorkout);
    inputType.classList.add('hidden__option');

    let workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;
    let id = workoutEl.dataset.id;

    editingWorkout = workoutsObj[id];

    let { name } = editingWorkout;
    let { cadence } = editingWorkout;
    let { duration } = editingWorkout;
    let { distance } = editingWorkout;
    let { elevationGain } = editingWorkout;

    inputDistance.value = distance;
    inputDuration.value = duration;

    if (name == 'Running') {
      inputCadence.value = cadence;
      if (
        inputCadence
          .closest('.form__row')
          .classList.contains('form__row--hidden')
      ) {
        inputType.value = 'running';
        inputElevation
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
        inputCadence
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
      }
    } else if (name == 'Cycling') {
      inputElevation.value = elevationGain;
      if (
        inputElevation
          .closest('.form__row')
          .classList.contains('form__row--hidden')
      ) {
        inputType.value = 'cycling';
        inputElevation
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
        inputCadence
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
      }
    }
    console.log(editingWorkout);
    console.log('\n\n');
    form.classList.remove('hidden');
  };
  _deleteWorkout = () => {
    let deleteId = editingWorkout.id;

    delete workoutsObj[deleteId];
    this._setLocalStorage();

    location.reload();
  };
  _showEditForm = () => {
    if (!editingTime) {
      editingTime = true;
      editBtn.textContent = 'END EDITION';

      containerWorkouts.addEventListener('click', this._editWorkout.bind(App));
      formBtn.textContent = 'SUBMIT EDITION';
    } else if (editingTime) {
      editingTime = false;
      editBtn.textContent = 'EDIT';
      formBtn.textContent = 'SUBMIT TRAINING';
      form.classList.add('hidden');
      form.removeEventListener('submit', this._infoModifyWorkout);
    }
  };

  _toggleElevationField() {
    inputType.addEventListener('change', function (e) {
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
  }
  _markerRender(lastTraining) {
    if (!lastTraining) return;
    let { coords } = lastTraining;
    L.marker(coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${lastTraining.name.toLowerCase()}-popup`,
        })
      )
      .setPopupContent(
        `${lastTraining.name == 'Running' ? '🏃‍♂️🏃' : '🚴'}${
          lastTraining.description
        }`
      )
      .openPopup();
  }

  _workoutRender(lastTraining) {
    if (!lastTraining) return;
    let html = `<li class="workout workout--${lastTraining.name.toLowerCase()}" data-id=${
      lastTraining.id
    }>
    <h2 class="workout__title">${lastTraining.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        lastTraining.name === 'Running' ? '🏃‍♂️' : '🚴'
      }</span>
      <span class="workout__value">${lastTraining.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${lastTraining.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (lastTraining.name === 'Running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${lastTraining.pace}</span>
      <span class="workout__unit">km/hr</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${lastTraining.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>
`;
    } else if (lastTraining.name === 'Cycling') {
      html += ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${lastTraining.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${lastTraining.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _infoModifyWorkout = e => {
    e.preventDefault();
    if (!editingTime) return;
    console.log(editingWorkout);
    let editingId = editingWorkout.id;
    let speedPace = ((inputDistance.value / inputDuration.value) * 60).toFixed(
      2
    );

    if (editingWorkout.name == 'Running') {
      workoutsObj[editingId].cadence = inputCadence.value;
      workoutsObj[editingId].pace = speedPace;
    } else if (editingWorkout.name == 'Cycling') {
      workoutsObj[editingId].elevationGain = inputElevation.value;
      workoutsObj[editingId].speed = speedPace;
    }
    workoutsObj[editingId].distance = inputDistance.value;
    workoutsObj[editingId].duration = inputDuration.value;

    this._setLocalStorage();
    this._workoutRender(editingWorkout);

    location.reload();
  };
  _moveToPopUp(e) {
    let workoutEl = e.target.closest('.workout');
    //console.log(workoutEl);

    if (!workoutEl) return;
    let id = workoutEl.dataset.id;

    console.log(id);
    let { coords } = workoutsObj[id];
    //console.log(workoutsObj);

    map.setView(coords, 20, { animate: true, pan: { duration: 1 } });
  }
  _setLocalStorage() {
    localStorage.setItem('workout', JSON.stringify(workoutsObj));
    localStorage.removeItem('Id');
    localStorage.setItem('Id', JSON.stringify(Id));
  }
  _getLocalStorage() {
    let data = JSON.parse(localStorage.getItem('workout'));
    mapType = JSON.parse(localStorage.getItem('mapType'));
    Id = JSON.parse(localStorage.getItem('Id'));
    //console.log(mapType);

    if (!data) return;
    workoutsObj = data;
    workoutsObj.forEach(workout => {
      this._workoutRender(workout);
    });
  }

  _resetLocalStorage() {
    localStorage.removeItem('workout');

    localStorage.removeItem('Id');
    Id = 0;
    location.reload();
  }
}

class Workout {
  constructor(id, distance, duration, coords) {
    this.id = id;
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.date = new Date();
  }

  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.name} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(id, distance, duration, coords, cadence) {
    super(id, distance, duration, coords);
    this.name = 'Running';
    this.cadence = cadence;
    this.pace = ((distance / duration) * 60).toFixed(2);
    this._setDescription();
  }
}
class Cycling extends Workout {
  constructor(id, distance, duration, coords, elevationGain) {
    super(id, distance, duration, coords);
    this.name = 'Cycling';
    this.speed = ((distance / duration) * 60).toFixed(2);
    this.elevationGain = elevationGain;
    this._setDescription();
  }
}

const aplicacion = new App();
console.log(Id);

console.log(workoutsObj);
