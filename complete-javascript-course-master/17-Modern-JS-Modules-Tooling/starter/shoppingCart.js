// Exporting module
console.log('Export module');

const shippingCost = 10;
const cart = [];
export default function () {
  console.log('puto, el que me quita la papa');
}
export let totalKm = 5;

export { shippingCost };

function running(km) {
  console.log('You ran', km, 'km');
  console.log(`Total km before ${totalKm}`);

  totalKm += km;
  console.log('Total km after' + totalKm);
}

export function totalKmM(km) {
  totalKm = km;
}
export function runningDay(km, day) {
  console.log('Today is ', day);
  running(km);
}
export async function fetching() {
  let resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return resp;
}
