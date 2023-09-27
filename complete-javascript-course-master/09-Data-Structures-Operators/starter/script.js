'use strict';
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

let flightFormatted = flights
  .replaceAll('_', ' ')
  .replaceAll('+', '\n')
  .replaceAll(';', ' ')
  .replaceAll('fao93766109', 'FAO')
  .replaceAll('txl2133758440', 'TXL')
  .replaceAll('bru0943384722', 'BRU')
  .replaceAll('lis2323639855', 'LIS')
  .padStart(20)
  .replaceAll('Departure', 'Departure from')
  .replaceAll('Arrival', 'Arrival from')
  .replaceAll('Delayed', '😡Delayed');
console.log(flights);

console.log(flightFormatted);

/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let button = document.querySelector('button');
let text;

let convertToCamelCase = function (text) {
  let convertedArray = [];
  for (let i = 0; i < text.length; i++) {
    let convertedText = text[i].toLowerCase();
    let checkMarks = '✅';
    convertedText = convertedText.trim();
    convertedText = convertedText.split('_');
    let capitalLetter = convertedText[1][0].toUpperCase();
    let restOfTheWord = convertedText[1];
    let capitalWord = capitalLetter + restOfTheWord.slice(1);
    convertedText[1] = capitalWord;
    convertedText.push(checkMarks.repeat(i + 1));
    let finalWord = convertedText.join('');

    convertedArray.push(finalWord);
  }
  convertedArray = convertedArray.join(' \n');
  console.log(convertedArray);
};
let convertTextArray = function (text) {
  let textArray = text.split('\n');
  return textArray;
};

button.addEventListener('click', function () {
  text = document.querySelector('textarea').value;

  convertToCamelCase(convertTextArray(text));
});
*/
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
*/
//let [Pizza, Pasta] = restaurant.mainMenu;
//console.log(Pizza, Pasta);
//[Pizza, Pasta] = [Pasta, Pizza];
//console.log(Pizza, Pasta);
/* const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

const [typicalDish, ...starterMenuRest] = restaurant.starterMenu;
console.log(typicalDish, starterMenuRest);

const { type: laCasaPaco = 'Restaurante Mexicano' } = restaurant;
console.log(laCasaPaco);
const { starterMenu } = restaurant;
const [bestDish, ...rest] = starterMenu;
console.log(bestDish, rest);
const restOfStartMenuPlusmainMenu = [...rest, ...restaurant.mainMenu];
console.log(restOfStartMenuPlusmainMenu);
const test = function (bestDish, ...otherOptions) {
  console.log(
    `Our recommendation as best dish is the ${bestDish} and as other options we have ${
      otherOptions[otherOptions.length - 2]
    } and ${otherOptions[otherOptions.length - 1]}`
  );
};

test(bestDish, restOfStartMenuPlusmainMenu);
const nested = [1, (2)[(5, 6)]];
const [one, , [...subnested]] = nested;
console.log(one, subnested);


let friends;
//console.log(undefined && friends);

const rest1 = {
  name: 'Pomodoro',
  numGuests: 0,
  Location: 'Santa Cruz 315',
};

//console.log((rest1.numGuests ||= 15));

//console.log(rest1);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals() {
    console.log(...this.scored, this.score, 'Goals scored');
  },
};
const [[...players1], [...players2]] = game.players;

const [gk, ...fieldPlayers1] = players1;
const allPlayers = [...players1, ...players2];

const team1SubstitutePlayers = ['Thiago', 'Coutinho', 'Perisic'];
const players1Final = [...players1, ...team1SubstitutePlayers];
const { team1: team1odds, x: draw, team2: team2odds } = game.odds;
game.printGoals();

console.log(
  ` The ${
    (team1odds > team2odds && game.team2) ||
    (team1odds < team2odds && game.team1)
  } has more odds of winning`
);

const [scored] = game.scored;

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}
const oddsAverage = (team1odds + team2odds + draw) / 3;
console.log(oddsAverage);

for (let [team, odd] of Object.entries(game.odds)) {
  let teamStr =
    team == 'x'
      ? `The chances of draw are ${odd}`
      : `Odd of victory for ${game[team]}: ${odd}`;
  console.log(teamStr);
}

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);
let gameEventsUnique = new Set([...gameEvents.values()]);
console.log(gameEventsUnique);
gameEvents.delete(64);
console.log(gameEvents);
let gameAverage = 0;
//let eventKeys = [...gameEvents.keys()];

for (let eventKeys of [...gameEvents.keys()]) {
  gameAverage += eventKeys;
  if (eventKeys <= 45) {
    console.log(`[FIRST HALF] min ${eventKeys}: ${gameEvents.get(eventKeys)}`);
  } else if (eventKeys > 45 && eventKeys < 95) {
    console.log(`[SECOND HALF] min ${eventKeys}: ${gameEvents.get(eventKeys)}`);
  }
}
gameAverage = gameAverage / 90;
console.log(`The average time between events was of ${gameAverage}`);

/*for (let averageEventTime of ) {
  averageEventTime += averageEventTime;
  console.log(averageEventTime);
}
*/
/*
const setTest = new Set(['Hola', 'Como ', 'Estas']);

console.log(setTest);

for (const order of setTest) {
  console.log(order);
}

const mapTest = new Map([
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  [true, 'Correct🙌'],
  [false, 'Wrong answer'],
]);

for (const [key, value] of mapTest) {
  if (typeof key === 'number') {
    console.log(`Question ${key}: ${value}`);
  }
}
const answer = Number(prompt('Which is the best language?'));
console.log(answer);
console.log(mapTest.get(answer === 3));
*/
