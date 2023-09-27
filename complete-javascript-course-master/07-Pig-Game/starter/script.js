'use strict';
//elements DOM Manipulation
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

const playerOneScoreEl = document.querySelector('#current--0');
const playerTwoScoreEl = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');
const playerOneTotalScoreEl = document.querySelector('#score--0');
const playerTwoTotalScoreEl = document.querySelector('#score--1');
const btnRollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Variables used for the score purposes
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;

const randomNumber = () => {
  return Math.ceil(Math.random() * 6);
};
let number = 0; //Number that was the result of the dice
let currentPlayer = playerOneScore;
let currentPlayerTotalScore = playerOneTotalScore;
let currentPlayerEl = playerOneScoreEl;
let currentPlayerTotalScoreEl = playerOneTotalScoreEl;

const switchPlayers = () => {
  if (currentPlayerEl == playerOneScoreEl) {
    currentPlayer = playerTwoScore;
    currentPlayerEl = playerTwoScoreEl;
    currentPlayerTotalScore = playerTwoTotalScore;
    currentPlayerTotalScoreEl = playerTwoTotalScoreEl;

    player1El.classList.remove('player--active');
    player2El.classList.add('player--active');
  } else if (currentPlayerEl == playerTwoScoreEl) {
    currentPlayer = playerOneScore;
    currentPlayerEl = playerOneScoreEl;
    currentPlayerTotalScore = playerOneTotalScore;
    currentPlayerTotalScoreEl = playerOneTotalScoreEl;

    player2El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
};

const determineWinner = () => {};

//Starting Conditions
playerOneScoreEl.textContent = 0;
playerTwoScoreEl.textContent = 0;
playerOneTotalScoreEl.textContent = 0;
playerTwoTotalScoreEl.textContent = 0;

diceImage.classList.add('hidden');

btnRollDice.addEventListener('click', function () {
  if (playerOneTotalScore >= 100) {
    player2El.classList.remove('player--active');
    return player1El.classList.add('player--winner');
  } else if (playerTwoTotalScore >= 100) {
    player1El.classList.remove('player--active');
    return player2El.classList.add('player--winner');
  }

  number = randomNumber(); //We match the dice result with the number variable so that this represents the result

  diceImage.classList.remove('hidden');
  diceImage.src = `./img/dice-${number}.png`; //We set the dice picture to be displayed according to the number result of the random function
  if (number == 1) {
    currentScore = 0;
    currentPlayerEl.textContent = currentScore; //This condition works to reset current score when a 1 is thrown
    return switchPlayers();
  } else {
    currentScore += number;
    currentPlayerEl.textContent = currentScore;
  }
});

btnHold.addEventListener('click', function () {
  if (currentPlayerEl == playerOneScoreEl) {
    playerOneTotalScore += currentScore;
    currentPlayerTotalScore = playerOneTotalScore;
  } else if (currentPlayerEl == playerTwoScoreEl) {
    playerTwoTotalScore += currentScore;
    currentPlayerTotalScore = playerTwoTotalScore;
  }

  currentScore = 0;
  currentPlayerEl.textContent = 0;
  currentPlayerTotalScoreEl.textContent = currentPlayerTotalScore;
  return switchPlayers();
});

btnNew.addEventListener('click', function () {
  player2El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  console.log(player1El.classList);

  playerOneScoreEl.textContent = 0;
  playerTwoScoreEl.textContent = 0;
  playerOneTotalScoreEl.textContent = 0;
  playerTwoTotalScoreEl.textContent = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  diceImage.classList.add('hidden');
  currentScore = 0;
  number = 0;
  currentPlayerEl = playerOneScoreEl;

  player2El.classList.remove('player--active');
  player1El.classList.add('player--active');
});
