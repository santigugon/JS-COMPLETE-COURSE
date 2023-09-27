'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  act: 'NO',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  act: 'NO',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  act: 'NO',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  act: 'NO',
};

const accounts = [account1, account2, account3, account4];

// Elements
const app = document.querySelector('.app');

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const generateUserName = owner => {
  let username = [];
  username.push(owner.trimStart()[0]);
  username.push(owner[owner.indexOf(' ') + 1]);

  if (owner.indexOf(' ') !== owner.lastIndexOf(' ')) {
    username.push(owner[owner.lastIndexOf(' ') + 1]);
  }
  username = username.join('').toLowerCase();

  return username;
};

const computeUserName = function (arr) {
  arr.forEach(account => {
    account.username = generateUserName(account.owner);
  });
};
computeUserName(accounts);

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements">
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calculateBalance = function (arr) {
  const balance = arr.reduce((acum, curr) => (acum += curr), 0);
  return (labelBalance.textContent = ` ${balance}€`);
};
const calculateDeposit = function (arr) {
  const deposit = arr
    .filter(mov => mov > 0)
    .reduce((acc, curr, i, arr) => {
      console.log(arr);
      return (acc += curr);
    }, 0);
  return (labelSumIn.textContent = `${deposit}€`);
};

const calculateWithdrawals = function (arr) {
  const withdrawal = arr
    .filter(mov => mov < 0)
    .reduce((acc, curr, i, arr) => {
      console.log(arr);
      return (acc += curr);
    }, 0);
  return (labelSumOut.textContent = `${Math.abs(withdrawal)}€`);
};

const accountSummary = function (account) {
  displayMovements(account.movements);
  calculateBalance(account.movements);
  calculateDeposit(account.movements);
  calculateWithdrawals(account.movements);
  calculateInterest(account.movements, account.interestRate);
};

const calculateInterest = function (arr, interestRate) {
  const interest = arr
    .filter(mov => mov > 0)
    .map(mov => (mov * interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, curr) => (acc += curr), 0);
  return (labelSumInterest.textContent = `${interest}€`);
};

const login = function (username, pin) {
  if (accounts.find(acc => acc.act === 'Active')) {
    alert('LOG OUT FIRST');
  } else {
    const account = accounts.find(acc => {
      return acc.username == username;
    });
    if (account.pin === pin) {
      app.style.opacity = 100;
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      accountSummary(account);
      account.act = 'Active';
      labelWelcome.textContent = `Welcome, ${account.owner.slice(
        0,
        account.owner.indexOf(' ')
      )}`;
      labelTimer.textContent = setTimeout(
        logOut,
        5 * 60 * 1000,
        account,
        username,
        pin
      );
    } else {
      alert('Wrong password or username!');
    }
  }
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  login(username, pin);
});

const logOut = function (actAccount, username, pin) {
  if (actAccount.pin === pin && actAccount.username === username) {
    app.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    actAccount.act = 'NO';
    console.log(actUser());
    labelWelcome.textContent = 'Log in to get started';
  } else {
    alert('Wrong password or username!');
  }
};
const actUser = () => accounts.find(acc => acc.act === 'Active');

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  let act = actUser();
  logOut(act, user, pin);
});

const transferMoney = function (receiver, amount) {
  const currUser = actUser();
  if (currUser.movements.reduce((acc, mov) => (acc += mov), 0) >= amount) {
    currUser.movements.push(-amount);
    const receiverAcc = accounts.find(acc => acc.username === receiver);
    receiverAcc.movements.push(amount);
    accountSummary(currUser);
    inputTransferTo.value = '';
    inputLoanAmount.value = 0;
  } else {
    alert('Not enough money, try another amount');
  }
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiver = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  transferMoney(receiver, amount);
});

const maxDeposit = function (acc) {
  return acc.movements.reduce((acc, curr) => {
    if (curr > acc) {
      acc = curr;
    }
    return acc;
  }, 0);
};

const checkLoan = function (loan) {
  const currUser = actUser();
  console.log(maxDeposit(currUser));

  if (loan < maxDeposit(currUser) * 0.1) {
    currUser.movements.push(loan);
    accountSummary(currUser);
  } else {
    alert('Not enough credit');
  }
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  checkLoan(loanAmount);
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  const reverseString = function (arr, sort) {
    if (sort === false) {
      sorted = true;
      return arr.movements.slice().reverse();
    } else if (sort === true) {
      sorted = false;
      return arr.movements;
    }
  };
  //  reverseString = reversedString();

  displayMovements(reverseString(actUser(), sorted));
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const bankDeposits = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => (acc += mov), 0);

console.log(bankDeposits);
const bankDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000)
  .reduce((acc, mov) => (acc += 1), 0);

console.log(bankDeposits1000);

//Coding Challenge #4

//Arrays excercise
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

let createRecommendedPortion = dogs =>
  dogs.map(dog => (dog.portion = dog.weight ** 0.75 * 28));

let enoughPortion = owner => {
  let dog = dogs.find(dog => dog.owners.includes(owner));
  dog.curFood >= dog.portion * 0.9
    ? dog.portion <= dog.portion * 1.1
      ? console.log('Your dog is eating enough')
      : console.log('Your dog is eating too much')
    : console.log('Your dog is not eating enough');
};
createRecommendedPortion(dogs);

console.log(dogs);
enoughPortion('Sarah');
const eatingTooMuch = dogs.filter(dog => dog.curFood > dog.portion * 1.1);
const eatingTooLittle = dogs.filter(dog => dog.curFood < dog.portion * 0.9);

const displayOwnersDogProblems = function () {
  let ownersMuch = [];
  eatingTooMuch.forEach(dog => {
    ownersMuch.push(dog.owners);
  });

  console.log(`${ownersMuch.flat().join(' and ')} dogs are eating too much`);

  let ownersLittle = [];
  eatingTooLittle.forEach(dog => {
    ownersLittle.push(dog.owners);
  });

  console.log(
    `${ownersLittle.flat().join(' and ')} dogs are eating too little`
  );
};
displayOwnersDogProblems();

console.log(dogs.some(dog => dog.portion === dog.curFood));
console.log(
  dogs.some(
    dog => dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1
  )
);
console.log(
  dogs.filter(
    dog => dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1
  )
);
let orderDogs = dogs;
orderDogs.portion.sort((a, b) => a - b);
console.log(orderDogs);

/*
const convertTitleCase = function (text) {
  return text
    .split(' ')
    .map(letters => {
      let capitalLetter;
      if (exceptions.some(exception => exception == letters)) {
        capitalLetter = letters[0];
      } else {
        capitalLetter = letters[0].toUpperCase();
      }
      return capitalLetter.concat(letters.slice(1));
    })
    .join(' ');
};
const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

console.log(
  convertTitleCase(
    'I am here in a lovely day with Nanis enjoying my life and my time with her'
  )
);
/*
const calcAverageHumanAge = dogs => {
  let humanYears = dogs
    .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
    .filter(dog => dog > 18)
    .reduce((acc, curr, I, arr) => acc + curr / arr.length, 0);
  return humanYears;
};
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



const calcAverageHumanAge = function (dogs) {
  let humanYears = dogs.map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4));
  console.log(humanYears);
  let overAge = humanYears.filter(dog => dog > 18);
  let averageAge = overAge.reduce(
    (acc, curr, I, arr) => acc + curr / arr.length,
    0
  );
  return averageAge;
};


const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

let balanceForOf = 0;

for (let mov of movements) {
  balanceForOf += mov;
}
console.log(balanceForOf);

console.log(balance);


const eurToUSD = 1.1;
const movementsUSD = movements.map(mov => Math.floor(mov * eurToUSD));
const movementsUSDF = [];

for (let mov of movements) {
  movementsUSDF.push(Math.floor(eurToUSD * mov));
}

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDF);

const generateUserName = owner => {
  let username = [];
  username.push(owner.trimStart()[0]);
  username.push(owner[owner.indexOf(' ') + 1]);

  if (owner.indexOf(' ') !== owner.lastIndexOf(' ')) {
    username.push(owner[owner.lastIndexOf(' ') + 1]);
  }
  username = username.join('').toLowerCase();
  console.log(username);

  return username;
};

const computeUserName = function (arr) {
  arr.forEach(account => {
    account.username = generateUserName(account.owner);
    console.log(account);
  });
};
computeUserName(accounts);
once upon a younher year when al the shadows disappear the animals came outside to play
Mas que nada esto es una prueba para ver que tal esta la responsividad del sistema cuando escribo en modo miracast ya que tengo miedo de que la funcionalidad no sea la optima me encanta la idea  de qie aqio se ve tptañ,emte fluido pero del otro lado no tanto. esot es normal porque 

*/
/////////////////////////////////////////////////
