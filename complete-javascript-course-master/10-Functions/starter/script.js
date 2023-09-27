const kateData = [4, 1, 15, 8, 3];
const juliaData = [3, 5, 2, 12, 7];

const correctjuliaData = juliaData.slice(1, -2);

function checkDogs(arr1, arr2) {
  let joinArray = arr1.concat(arr2);
  let typeDog;
  joinArray.forEach((age, index) => {
    age < 3
      ? console.log(`Dog number ${index + 1} is still a puppy`)
      : console.log(
          `Dog number ${index + 1} is an adult, and is ${age} years old`
        );
  });
}
checkDogs(
  kateData,
  correctjuliaData
)(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
})();

('use strict');
function test() {
  let sangugon = 5;
  return function () {
    return sangugon;
  };
}

let prueba = test();
console.log(prueba());
let sangugon = prueba();
console.log(sangugon);

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3 : C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let userAnswer = prompt(
      'What is your favourite programming language? \n 0: JavaScript \n 1: Python \n 2: Rust \n 3: C++ \n (Write option number)'
    );

    if (userAnswer >= 0 && userAnswer <= 3) {
      this.answers[userAnswer]++;
      console.log(this.answers);
    }
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      this.answers;
    } else if (type === 'string') {
      console.log(`The results of the poll are ${this.answers}`);
    }
  },
};

const registerAnswer = poll.registerNewAnswer;
const displayResults = poll.displayResults;

const registerAnswerPoll = registerAnswer.bind(poll);
const displayResultsPoll = displayResults.bind(poll);

document.querySelector('.poll').addEventListener('click', function () {
  registerAnswerPoll();
  displayResultsPoll();
});

/*
const addTax = (rate, value) => {
  console.log(value + (value * rate) / 100);
  return vat => {
    console.log(vat + 0.23 * vat);
  };
};

addTax(25, 200)(1000);

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};
greet('Hey')('Santi');

console.log('test');
let passenger = 'JoNAs';
passenger = passenger.toLowerCase();
console.log(passenger);

const email = 'sangugon@gmail.com';
const loginemail = ' sanguGON@gmail.COM \n';
function checkEmail(emaillogin) {
  emaillogin = emaillogin.trim();
  //emaillogin = emaillogin.slice(0, emaillogin.lastIndexOf(' '));
  emaillogin = emaillogin.toLowerCase();
  console.log(emaillogin);
  if (emaillogin === email) {
    console.log('Matching email');
  }
}

checkEmail(loginemail);

const announcement = 'All passangers to gate 23. I repeat gate 23';
console.log(announcement.replaceAll('gate', 'door'));
let test = 'Arroz';
let reverseString = function (str) {
  let i = str.length - 1;
  let newString = [];
  console.log(str.length);

  for (i; i >= 0; i--) {
    console.log(str[i]);

    newString.push(str[i]);
    console.log(newString);
    let joinedString = newString.join('');
    console.log(joinedString);
  }
  console.log(newString);
};
reverseString(test);
*/
