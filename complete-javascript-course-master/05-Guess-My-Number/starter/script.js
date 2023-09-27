'use strict';
console.log(document.querySelector('.message').textContent);

function generateRandomNumber() {
  return Math.ceil(Math.random() * 20);
}
let numberTry;
let randomNumber = generateRandomNumber();
let tryCount = 20;
let countRecord = 0;

document.querySelector('.highscore').textContent = countRecord;
document.querySelector('.score').textContent = tryCount;

document.querySelector('.check').addEventListener('click', function () {
  numberTry = document.querySelector('.guess').value;
  if (numberTry == randomNumber) {
    if (tryCount > countRecord) {
      countRecord = tryCount;
      document.querySelector('.highscore').textContent = countRecord;
    }
    document.querySelector('.message').textContent = '🙌 Correct number';
    document.querySelector('body').style.backgroundColor = '#60b347';
    return (document.querySelector('.number').textContent = randomNumber);
  } else if (numberTry != randomNumber) {
    if (tryCount == 0) {
      document.querySelector('body').style.backgroundColor = '#FF0000';
      document.querySelector('.message').textContent = '😨You lost';
      document.querySelector('.number').textContent = randomNumber;
    } else {
      tryCount -= 1;
      document.querySelector('.message').textContent =
        numberTry > randomNumber ? '📈 Too high!' : '📉 Too low!';
    }
    console.log(numberTry);
  }
  document.querySelector('.highscore').textContent = countRecord;
  document.querySelector('.score').textContent = tryCount;
});

document.querySelector('.again').addEventListener('click', function () {
  tryCount = 20;
  document.querySelector('.score').textContent = tryCount;
  randomNumber = generateRandomNumber();
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing';
  document.querySelector('body').style.backgroundColor = '#222';
});

console.log(numberTry);
