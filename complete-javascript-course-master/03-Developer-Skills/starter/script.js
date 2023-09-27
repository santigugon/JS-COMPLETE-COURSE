// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const maxTemps = [12, 5, -5, 0, 4];

function printForecast(array) {
  let forecast = "";
  for (let i = 0; i < maxTemps.length; i++) {
    let day = `...${array[i]}C in ${i + 1} days `;
    forecast = forecast + day;
    console.log(forecast);
  }
}

printForecast(maxTemps);

/*const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: Number(prompt("Degree celsius:")),
  };
  console.table(measurement);

  const kelvin = measurement.value + 273;
  return kelvin;
};
debugger;
console.log(measureKelvin());
*/
