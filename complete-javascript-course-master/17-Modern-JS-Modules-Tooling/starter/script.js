// Importing module

fetching().then(resp => console.log(resp));
if (module.hot) {
  module.hot.accept();
}

import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
cloneDeep();
import './shoppingCart.js';
import elDefault, {
  shippingCost,
  runningDay,
  totalKm,
  totalKmM,
  fetching,
} from './shoppingCart.js';

elDefault();
console.log('Import module');
console.log(shippingCost);
runningDay(25, 'Wednesday');
console.log(totalKm);
totalKmM(0);
runningDay(10, 'Wed');

let arr = [12, 3, 4, 5];
console.log(arr.at(-2));
arr.push(1);
console.log(arr);

import 'core-js/stable/array/find';
import 'regenerator-';
