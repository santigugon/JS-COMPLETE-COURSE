'use strict';
const Person = function (firstName, bithYear) {
  this.firstName = firstName;
  this.birthYear = bithYear;
};

const yo = new Person('Santi', 2003);
console.log(yo);

const House = function (nRooms, adress, year, price) {
  (this.nRooms = nRooms),
    (this.adress = adress),
    (this.year = year),
    (this.price = price);
};

const miCasa = new House(3, 'Santa Cruz 315', 1992, 7000000); //I Created an instance of House
console.log(miCasa);

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};
console.log(yo.calcAge());
console.log(Function.prototype);

//Coding Challenge 1

const Cars = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

Cars.prototype.accelerate = function () {
  let newSpeed = this.speed + 10;
  return newSpeed;
};

Cars.prototype.brake = function () {
  let newSpeed = this.speed - 5;
  return newSpeed;
};

const ford = new Cars('Ford', 120);
const fiat = new Cars('Fiat', 85);

console.log(ford.accelerate());
console.log(fiat.brake());
class dogs {
  constructor(age, breed) {
    this.age = age;
    this.breed = breed;
  }
}

const jagger = new dogs(18, 'Electrico');
console.log(jagger);
console.log(dogs.__proto__.__proto__.__proto__);

class Persons {
  constructor(Name, birthYear) {
    this.Name = Name;
    this.birthYear = birthYear;
  }
  get Age() {
    return 2022 - this.birthYear;
  }
  set Name(Name) {
    this.firstName = Name.split(' ')[0];
    console.log(Name.split(' ')[0]);
  }
}

const Santi = new Persons('Santiago Gutierrez', 2003);

console.log(Santi.Age);
console.log(Santi.firstName);
console.log(Santi);

let prueba = 'Hola como estas';
console.log(prueba.split(' ')[0]);

const protoTest = {
  defineAge() {
    return 2022 - this.birthYear;
  },
};

const santi = Object.create(protoTest);
santi.birthYear = 2003;
console.log(santi.defineAge());

class carMaker {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    console.log(this.speedUS() * 1.6);
    speed = this.speedUS();
    console.log(speed);
  }
  accelerate(newSpeed) {
    this.speed += newSpeed;
  }
  break(newSpeed) {
    this.speed -= newSpeed;
  }
}

const Ford = new carMaker('Ford', 120);
console.log(Ford);
Ford.break(10);
console.log(Ford);

const Student = function (name, birthYear, course) {
  Person.call(this, name, birthYear);
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
const Dave = new Student('Dave', 1970, 'Survival');
console.log(Dave.calcAge());

//Challenge3

const Ev = function (make, speed, charge) {
  this.make = make;
  this.speed = speed;
  this.charge = charge;
};

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Ev.prototype.accelerate = function () {
  this.charge -= 1;
  this.speed += 20;
  console.log(`Tesla going at ${this.speed} with a charge of ${this.charge}`);
};
Ev.prototype.break = function () {
  this.speed -= 20;
  console.log(`Tesla going at ${this.speed} with a charge of ${this.charge}`);
};

const tesla = new Ev('tesla', 120, 23);
console.log(tesla);
console.log(tesla.chargeBattery(50));
tesla.accelerate();
tesla.break();

class Persona {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(`You are ${2022 - this.birthYear} years old`);
  }
}

class Estudiante extends Persona {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
}

const sangu = new Estudiante('Santi', '2003', 'Computer Engineering');
console.log(sangu);
sangu.calcAge();

const Perro = {
  init(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  },
};

const BorderCollie = Object.create(Perro);

class Account {
  #movements = [];
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin;
  }
  getMovements() {
    console.log(this.#movements);
  }
  addMoney(val) {
    this.#movements.push(val);
  }

  #approveLoan() {
    return true;
  }
}
const cuenta = new Account('Santi', 'Pesos', 1415);
cuenta.addMoney(400);
cuenta.addMoney(4200);
cuenta.getMovements();
console.log(cuenta);

class EV {
  #charge;
  constructor(make, charge, speed) {
    this.speed = speed;
    this.make = make;
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 10;
    this.#charge -= 1;
    console.log(`The ${this.make} is going at a speed of ${this.speed}km/h`);

    return this;
  }

  break() {
    this.speed -= 10;
    console.log(`The car is now going at ${this.speed} km/h`);

    return this;
  }
  chargeBattery(goal) {
    this.#charge = goal;
    return this;
  }
}
const rivian = new EV('Rivian', 23, 120);
//cuenta.#approveLoan();
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .break()
  .chargeBattery(50)
  .accelerate();
