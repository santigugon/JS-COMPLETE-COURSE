let openAi = document.querySelector('.openAi');

class Product {
  #value;
  #description;
  #user;
  #limit;
  constructor(value = 0, description = '', user) {
    this.#value = value;
    this.#description = description;
    this.#user = user;
    this.limitCalc();
  }
  getValue() {
    return this.#value;
  }
  setValue(val) {
    this.#value = val;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(des) {
    this.#description = des;
  }

  getUser() {
    return this.#user;
  }
  setUser(us) {
    this.#user = us;
  }

  getLimit() {
    return this.#limit;
  }
  limitCalc() {
    if (this.#user === 'jonas') this.#limit = 1500;
    else if (this.#user === 'matilda') this.#limit = 100;
  }
}

let budget = [
  new Product(250, 'Sold old TV 📺', 'jonas'),
  new Product(-45, 'Groceries 🥑', 'jonas'),
  new Product(3500, 'Monthly salary 👩‍💻', 'jonas'),
  new Product(300, 'Freelancing 👩‍💻', 'jonas'),
  new Product(-1100, 'New iPhone 📱', 'jonas'),
  new Product(-20, 'Candy 🍭', 'matilda'),
  new Product(-125, 'Toys 🚂', 'matilda'),
  new Product(-1800, 'New Laptop 💻', 'jonas'),
];

const add = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  let buyer = new Product('', '', user);

  let lim = buyer.getLimit();

  if (value <= lim) {
    budget.push(new Product(-value, description, user));
  }
};
add(10, 'Pizza 🍕');
add(100, 'Going to movies 🍿', 'Matilda');
add(200, 'Stuff', 'Jay');
console.log(budget);

const check = function () {
  budget = budget.map(el => {
    el.getValue() < -el.getLimit() ? (el.flag = 'limit') : '';
    return el;
  });

  // for (let el of budget) {
  //   let lim;
  //   if (limits[el.user]) {
  //     lim = limits[el.user];
  //   } else {
  //     lim = 0;
  //   }

  //   if (el.value < -lim) {
  //     el.flag = 'limit';
  //   }
  // }
};
check();

console.log(budget);

const bigExpenses = function () {
  let output = '';
  budget.forEach(el =>
    el.getValue() <= -el.getLimit()
      ? (output += el.getDescription().slice(-2) + ' / ')
      : ''
  );
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses();
let image = async function () {
  // const response = await openai.createImage({
  //   prompt: 'a white siamese cat',
  //   n: 1,
  //   size: '1024x1024',
  // });
  // image_url = response.data.data[0].url;
  // openAi.src = image_url;
  // const { Configuration, OpenAIApi } = require('openai');
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);
  // const response = await openai.createImage({
  //   prompt: 'A cute baby sea otter',
  //   n: 2,
  //   size: '1024x1024',
  // });
  // openAi.src = response;
  let response = await fetch('https://api.openai.com/v1/images/generations');

  console.log(response);
};
image();
