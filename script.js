"use strict";

//////////////////////////////////////////////////////////////
//WEATHER API///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////Current Weather/////
// let currentCity = document.querySelector(`.city`);
// window.addEventListener(`load`, () => {
//   let lon;
//   let lat;
//   let currentTemp = document.querySelector(`.main-temp`);

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       lon = position.coords.longitude;
//       lat = position.coords.latitude;

//       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b82c02641bb16a6d993fd26b9eb7e7f&units=imperial`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           const { temp } = data.main;
//           const cityName = data.name;
//           currentTemp.innerHTML = `&nbsp;` + Math.round(temp) + `&deg;`;
//           currentCity.innerHTML = cityName.toUpperCase();
//         });
//     });
//   } else {
//     document.querySelector(`.city`).textContent = `Location Off`;
//   }
// });
//2022-05-19//
let d = new Date();
console.log(d);
let weatherDay = d.getDate();
let weatherMonth = d.getMonth() + 1;
let weatherYear = d.getFullYear();
let currentWeatherDate = weatherYear + `-0` + weatherMonth + `-` + weatherDay;
// console.log(currentWeatherDate);
const time = d.getHours();
// console.log(time);
let currentCity = document.querySelector(`.city`);
let currentTemp = document.querySelector(`.main-temp`);
/////FORCAST TEMPS/////
let now = document.getElementById(`now`);
let hr1 = document.getElementById(`hr1`);
let hr2 = document.getElementById(`hr2`);
let hr3 = document.getElementById(`hr3`);
/////FORECAST HOURS/////
let forecastHrNowEl = document.getElementById(`forecast-hr-now`);
let forecastHr1El = document.getElementById(`forecast-hr-1`);
let forecastHr2El = document.getElementById(`forecast-hr-2`);
let forecastHr3El = document.getElementById(`forecast-hr-3`);
/////3 HOUR FORECAST/////
/////IDEA --- MAKE 2 BUTTONS TO EITHER RUN A FUCNTION THAT GETS THE USER'S LAT + LONG OR TO SEARCH BY CITY
// window.addEventListener(`load`, () => {
//   let lon;
//   let lat;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       lon = position.coords.longitude;
//       lat = position.coords.latitude;

//       const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1b82c02641bb16a6d993fd26b9eb7e7f&units=imperial`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           let temperature = data.list[0].main.temp;
//           let cityName = data.city.name;
//           let forecastTime = d.getHours();
//           /////MAIN DISPLAY/////
//           currentTemp.innerHTML = `&nbsp;` + Math.round(temperature) + `&deg;`;
//           currentCity.innerHTML = cityName.toUpperCase();
//           /////FORECAST TEMPS/////
//           let nowTemp = data.list[0].main.temp;
//           let hr1Temp = data.list[1].main.temp;
//           let hr2Temp = data.list[2].main.temp;
//           let hr3Temp = data.list[3].main.temp;
//           now.innerHTML = `&nbsp;` + Math.round(nowTemp) + `&deg;`;
//           hr1.innerHTML = `&nbsp;` + Math.round(hr1Temp) + `&deg;`;
//           hr2.innerHTML = `&nbsp;` + Math.round(hr2Temp) + `&deg;`;
//           hr3.innerHTML = `&nbsp;` + Math.round(hr3Temp) + `&deg;`;
//           console.log(data.list[29].weather[0].main);
//           ////////////////////////
//           /////FORECAST ICONS/////
//           ////////////////////////

//           /////CURRENT HOUR/////
//           if (
//             data.list[0].weather[0].main === `Clouds` &&
//             data.list[0].weather[0].description === `overcast clouds`
//           ) {
//             document.getElementById(`hr0-cloudy`).style.display = `block`;
//           } else if (data.list[0].weather[0].main === `Clear`) {
//             document.getElementById(`hr0-sunny`).style.display = `block`;
//           } else if (
//             data.list[0].weather[0].id === 201 ||
//             data.list[0].weather[0].id === 202
//           ) {
//             document.getElementById(
//               `hr0-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[0].weather[0].main === `Thunderstorm`) {
//             document.getElementById(
//               `hr0-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[0].weather[0].main === `Snow`) {
//             document.getElementById(`hr0-snow`).style.display = `block`;
//           } else if (data.list[0].weather[0].main === `Rain`) {
//             document.getElementById(`hr0-rain`).style.display = `block`;
//           } else if (data.list[0].weather[0].description === `few clouds`) {
//             document.getElementById(
//               `hr0-partly-cloudy`
//             ).style.display = `block`;
//           } else if (data.list[0].weather[0].description === `broken clouds`) {
//             document.getElementById(
//               `hr0-partly-cloudy`
//             ).style.display = `block`;
//           } else if (
//             data.list[0].weather[0].description === `scattered clouds`
//           ) {
//             document.getElementById(
//               `hr0-partly-cloudy`
//             ).style.display = `block`;
//           }
//           console.log(data.list[0].weather[0].main);
//           /////1 HOUR/////
//           if (
//             data.list[1].weather[0].main === `Clouds` &&
//             data.list[1].weather[0].description === `overcast clouds`
//           ) {
//             document.getElementById(`hr1-cloudy`).style.display = `block`;
//           } else if (data.list[1].weather[0].main === `Clear`) {
//             document.getElementById(`hr1-sunny`).style.display = `block`;
//           } else if (
//             data.list[1].weather[0].id === 201 ||
//             data.list[1].weather[0].id === 202
//           ) {
//             document.getElementById(
//               `hr1-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[1].weather[0].main === `Thunderstorm`) {
//             document.getElementById(
//               `hr1-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[1].weather[0].main === `Snow`) {
//             document.getElementById(`hr1-snow`).style.display = `block`;
//           } else if (data.list[1].weather[0].main === `Rain`) {
//             document.getElementById(`hr1-rain`).style.display = `block`;
//           } else if (data.list[1].weather[0].description === `few clouds`) {
//             document.getElementById(
//               `hr1-partly-cloudy`
//             ).style.display = `block`;
//           } else if (data.list[1].weather[0].description === `broken clouds`) {
//             document.getElementById(
//               `hr1-partly-cloudy`
//             ).style.display = `block`;
//           } else if (
//             data.list[1].weather[0].description === `scattered clouds`
//           ) {
//             document.getElementById(
//               `hr1-partly-cloudy`
//             ).style.display = `block`;
//           }
//           /////2 HOUR/////
//           if (
//             data.list[2].weather[0].main === `Clouds` &&
//             data.list[2].weather[0].description === `overcast clouds`
//           ) {
//             document.getElementById(`hr2-cloudy`).style.display = `block`;
//           } else if (data.list[2].weather[0].main === `Clear`) {
//             document.getElementById(`hr2-sunny`).style.display = `block`;
//           } else if (
//             data.list[2].weather[0].id === 201 ||
//             data.list[2].weather[0].id === 202
//           ) {
//             document.getElementById(
//               `hr2-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[2].weather[0].main === `Thunderstorm`) {
//             document.getElementById(
//               `hr2-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[2].weather[0].main === `Snow`) {
//             document.getElementById(`hr2-snow`).style.display = `block`;
//           } else if (data.list[2].weather[0].main === `Rain`) {
//             document.getElementById(`hr2-rain`).style.display = `block`;
//           } else if (data.list[2].weather[0].description === `few clouds`) {
//             document.getElementById(
//               `hr2-partly-cloudy`
//             ).style.display = `block`;
//           } else if (data.list[2].weather[0].description === `broken clouds`) {
//             document.getElementById(
//               `hr2-partly-cloudy`
//             ).style.display = `block`;
//           } else if (
//             data.list[2].weather[0].description === `scattered clouds`
//           ) {
//             document.getElementById(
//               `hr20-partly-cloudy`
//             ).style.display = `block`;
//           }
//           /////3 HOUR/////
//           if (
//             data.list[3].weather[0].main === `Clouds` &&
//             data.list[3].weather[0].description === `overcast clouds`
//           ) {
//             document.getElementById(`hr3-cloudy`).style.display = `block`;
//           } else if (data.list[3].weather[0].main === `Clear`) {
//             document.getElementById(`hr3-sunny`).style.display = `block`;
//           } else if (
//             data.list[3].weather[0].id === 201 ||
//             data.list[3].weather[0].id === 202
//           ) {
//             document.getElementById(
//               `hr3-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[3].weather[0].main === `Thunderstorm`) {
//             document.getElementById(
//               `hr3-thunderstorm-with-rain`
//             ).style.display = `block`;
//           } else if (data.list[3].weather[0].main === `Snow`) {
//             document.getElementById(`hr3-snow`).style.display = `block`;
//           } else if (data.list[3].weather[0].main === `Rain`) {
//             document.getElementById(`hr3-rain`).style.display = `block`;
//           } else if (data.list[3].weather[0].description === `few clouds`) {
//             document.getElementById(
//               `hr3-partly-cloudy`
//             ).style.display = `block`;
//           } else if (data.list[3].weather[0].description === `broken clouds`) {
//             document.getElementById(
//               `hr3-partly-cloudy`
//             ).style.display = `block`;
//           } else if (
//             data.list[3].weather[0].description === `scattered clouds`
//           ) {
//             document.getElementById(
//               `hr3-partly-cloudy`
//             ).style.display = `block`;
//           }
//           /////FORECAST HOURS/////
//           let forecastHr1 = forecastTime + 3;
//           console.log(forecastHr1);
//           let forecastHr2 = forecastTime + 6;
//           let forecastHr3 = forecastTime + 9;
//           const formatTime = function (hour) {
//             if (hour === 25) {
//               return `1am`;
//             } else if (hour === 26) {
//               return `2am`;
//             } else if (hour === 3) {
//               return `3am`;
//             } else if (hour === 4) {
//               return `4am`;
//             } else if (hour === 5) {
//               return `5am`;
//             } else if (hour === 6) {
//               return `6am`;
//             } else if (hour === 7) {
//               return `7am`;
//             } else if (hour === 8) {
//               return `8am`;
//             } else if (hour === 9) {
//               return `9am`;
//             } else if (hour === 10) {
//               return `10am`;
//             } else if (hour === 11) {
//               return `11am`;
//             } else if (hour === 12) {
//               return `12pm`;
//             } else if (hour === 13) {
//               return `1pm`;
//             } else if (hour === 14) {
//               return `2pm`;
//             } else if (hour === 15) {
//               return `3pm`;
//             } else if (hour === 16) {
//               return `4pm`;
//             } else if (hour === 17) {
//               return `5pm`;
//             } else if (hour === 18) {
//               return `6pm`;
//             } else if (hour === 19) {
//               return `7pm`;
//             } else if (hour === 20) {
//               return `8pm`;
//             } else if (hour === 21) {
//               return `9pm`;
//             } else if (hour === 22) {
//               return `10pm`;
//             } else if (hour === 23) {
//               return `11pm`;
//             } else if (hour === 24) {
//               return `12am`;
//             } else {
//               return `0`;
//             }
//           };
//           forecastHr1El.innerHTML = formatTime(forecastHr1);
//           forecastHr2El.innerHTML = formatTime(forecastHr2);
//           forecastHr3El.innerHTML = formatTime(forecastHr3);
//           console.log(forecastHr3);
//         });
//     });
//   } else {
//     document.querySelector(`.city`).textContent = `Location Off`;
//   }
// });

/////One Hour Forecast/////

let weather = {
  fetchWeather: function (city) {
    fetch(
      `https://api.weatherstack.com/forecast?access_key=47cb91ecea50bb023ceb3a6023f2b4f1&query=` +
        city +
        `&forecast_days=1&hourly=1&interval=1&units=f`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data);
    let temp = data.current.temperature;
    let forecastTime = d.getHours();
    /////MAIN DISPLAY/////
    currentTemp.innerHTML = `&nbsp;` + temp + `&deg;`;
    /////FORECAST TEMPS/////
    // console.log(time);
    const formatForecastTime = function (hour) {
      if (hour === 25) {
        return 1;
      } else if (hour === 26) {
        return 2;
      } else if (hour === 3) {
        return 3;
      } else if (hour === 4) {
        return 4;
      } else if (hour === 5) {
        return 5;
      } else if (hour === 6) {
        return 6;
      } else if (hour === 7) {
        return 7;
      } else if (hour === 8) {
        return 8;
      } else if (hour === 9) {
        return 9;
      } else if (hour === 10) {
        return 10;
      } else if (hour === 11) {
        return 11;
      } else if (hour === 12) {
        return 12;
      } else if (hour === 13) {
        return 13;
      } else if (hour === 14) {
        return 14;
      } else if (hour === 15) {
        return 15;
      } else if (hour === 16) {
        return 16;
      } else if (hour === 17) {
        return 17;
      } else if (hour === 18) {
        return 18;
      } else if (hour === 19) {
        return 19;
      } else if (hour === 20) {
        return 20;
      } else if (hour === 21) {
        return 21;
      } else if (hour === 22) {
        return 22;
      } else if (hour === 23) {
        return 23;
      } else if (hour === 0) {
        return 0;
      } else {
        return `ope`;
      }
    };
    let nowTemp = data.current.temperature;
    let hr1Temp =
      data.forecast[currentWeatherDate].hourly[formatForecastTime(time + 1)]
        .temperature;
    console.log(hr1Temp);
    let hr2Temp =
      data.forecast[currentWeatherDate].hourly[formatForecastTime(time + 2)]
        .temperature;
    console.log(hr2Temp);
    let hr3Temp =
      data.forecast[currentWeatherDate].hourly[formatForecastTime(time + 3)]
        .temperature;
    console.log(hr3Temp);
    now.innerHTML = `&nbsp;` + nowTemp + `&deg;`;
    hr1.innerHTML = `&nbsp;` + hr1Temp + `&deg;`;
    hr2.innerHTML = `&nbsp;` + hr2Temp + `&deg;`;
    hr3.innerHTML = `&nbsp;` + hr3Temp + `&deg;`;

    /////FORECAST HOURS/////

    let forecastHr1 = forecastTime + 1;
    let forecastHr2 = forecastTime + 2;
    let forecastHr3 = forecastTime + 3;
    const formatTime = function (hour) {
      if (hour === 25) {
        return `1am`;
      } else if (hour === 26) {
        return `2am`;
      } else if (hour === 3) {
        return `3am`;
      } else if (hour === 4) {
        return `4am`;
      } else if (hour === 5) {
        return `5am`;
      } else if (hour === 6) {
        return `6am`;
      } else if (hour === 7) {
        return `7am`;
      } else if (hour === 8) {
        return `8am`;
      } else if (hour === 9) {
        return `9am`;
      } else if (hour === 10) {
        return `10am`;
      } else if (hour === 11) {
        return `11am`;
      } else if (hour === 12) {
        return `12pm`;
      } else if (hour === 13) {
        return `1pm`;
      } else if (hour === 14) {
        return `2pm`;
      } else if (hour === 15) {
        return `3pm`;
      } else if (hour === 16) {
        return `4pm`;
      } else if (hour === 17) {
        return `5pm`;
      } else if (hour === 18) {
        return `6pm`;
      } else if (hour === 19) {
        return `7pm`;
      } else if (hour === 20) {
        return `8pm`;
      } else if (hour === 21) {
        return `9pm`;
      } else if (hour === 22) {
        return `10pm`;
      } else if (hour === 23) {
        return `11pm`;
      } else if (hour === 24) {
        return `12am`;
      } else {
        return `0`;
      }
    };
    forecastHr1El.innerHTML = formatTime(forecastHr1);
    forecastHr2El.innerHTML = formatTime(forecastHr2);
    forecastHr3El.innerHTML = formatTime(forecastHr3);

    ////////////////////////
    /////FORECAST ICONS/////
    ////////////////////////

    /////CURRENT HOUR/////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr0-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && time < 20 && time > 6) {
      document.getElementById(`hr0-sunny`).style.display = `block`;
    } else if (
      (data.current.weather_code === 113 && time > 20) ||
      (data.current.weather_code === 113 && time < 7)
    ) {
      document.getElementById(`hr0-clear-night`).style.display = `block`;
    } else if (
      data.current.weather_code === 200 ||
      data.current.weather_code === 386 ||
      data.current.weather_code === 389
    ) {
      document.getElementById(
        `hr0-thunderstorm-with-rain`
      ).style.display = `block`;
    } else if (data.current.weather_code === 200) {
      document.getElementById(`hr0-thunderstorm`).style.display = `block`;
    } else if (
      data.current.weather_code === 227 ||
      data.current.weather_code === 230 ||
      data.current.weather_code === 323 ||
      data.current.weather_code === 326 ||
      data.current.weather_code === 329 ||
      data.current.weather_code === 332 ||
      data.current.weather_code === 335 ||
      data.current.weather_code === 338 ||
      data.current.weather_code === 368 ||
      data.current.weather_code === 371
    ) {
      document.getElementById(`hr0-snow`).style.display = `block`;
    } else if (
      data.current.weather_code === 266 ||
      data.current.weather_code === 296 ||
      data.current.weather_code === 299 ||
      data.current.weather_code === 302 ||
      data.current.weather_code === 305 ||
      data.current.weather_code === 308
    ) {
      document.getElementById(`hr0-rain`).style.display = `block`;
    } else if (
      data.current.weather_code === 116 ||
      data.current.weather_code === 119 ||
      data.current.weather_code === 176 ||
      data.current.weather_code === 353 ||
      data.current.weather_code === 356 ||
      data.current.weather_code === 359
    ) {
      document.getElementById(`hr0-partly-cloudy`).style.display = `block`;
    }
    ////////////////
    /////HOUR 1/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr1-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && time < 20 && time > 6) {
      document.getElementById(`hr1-sunny`).style.display = `block`;
    } else if (
      (data.current.weather_code === 113 && time > 20) ||
      (data.current.weather_code === 113 && time < 7)
    ) {
      document.getElementById(`hr1-clear-night`).style.display = `block`;
    } else if (
      data.current.weather_code === 200 ||
      data.current.weather_code === 386 ||
      data.current.weather_code === 389
    ) {
      document.getElementById(
        `hr1-thunderstorm-with-rain`
      ).style.display = `block`;
    } else if (data.current.weather_code === 200) {
      document.getElementById(`hr1-thunderstorm`).style.display = `block`;
    } else if (
      data.current.weather_code === 227 ||
      data.current.weather_code === 230 ||
      data.current.weather_code === 323 ||
      data.current.weather_code === 326 ||
      data.current.weather_code === 329 ||
      data.current.weather_code === 332 ||
      data.current.weather_code === 335 ||
      data.current.weather_code === 338 ||
      data.current.weather_code === 368 ||
      data.current.weather_code === 371
    ) {
      document.getElementById(`hr1-snow`).style.display = `block`;
    } else if (
      data.current.weather_code === 266 ||
      data.current.weather_code === 296 ||
      data.current.weather_code === 299 ||
      data.current.weather_code === 302 ||
      data.current.weather_code === 305 ||
      data.current.weather_code === 308
    ) {
      document.getElementById(`hr1-rain`).style.display = `block`;
    } else if (
      data.current.weather_code === 116 ||
      data.current.weather_code === 119 ||
      data.current.weather_code === 176 ||
      data.current.weather_code === 353 ||
      data.current.weather_code === 356 ||
      data.current.weather_code === 359
    ) {
      document.getElementById(`hr1-partly-cloudy`).style.display = `block`;
    }
    ////////////////
    /////HOUR 2/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr2-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && time < 20 && time > 6) {
      document.getElementById(`hr2-sunny`).style.display = `block`;
    } else if (
      (data.current.weather_code === 113 && time > 20) ||
      (data.current.weather_code === 113 && time < 7)
    ) {
      document.getElementById(`hr2-clear-night`).style.display = `block`;
    } else if (
      data.current.weather_code === 200 ||
      data.current.weather_code === 386 ||
      data.current.weather_code === 389
    ) {
      document.getElementById(
        `hr2-thunderstorm-with-rain`
      ).style.display = `block`;
    } else if (data.current.weather_code === 200) {
      document.getElementById(`hr2-thunderstorm`).style.display = `block`;
    } else if (
      data.current.weather_code === 227 ||
      data.current.weather_code === 230 ||
      data.current.weather_code === 323 ||
      data.current.weather_code === 326 ||
      data.current.weather_code === 329 ||
      data.current.weather_code === 332 ||
      data.current.weather_code === 335 ||
      data.current.weather_code === 338 ||
      data.current.weather_code === 368 ||
      data.current.weather_code === 371
    ) {
      document.getElementById(`hr2-snow`).style.display = `block`;
    } else if (
      data.current.weather_code === 266 ||
      data.current.weather_code === 296 ||
      data.current.weather_code === 299 ||
      data.current.weather_code === 302 ||
      data.current.weather_code === 305 ||
      data.current.weather_code === 308
    ) {
      document.getElementById(`hr2-rain`).style.display = `block`;
    } else if (
      data.current.weather_code === 116 ||
      data.current.weather_code === 119 ||
      data.current.weather_code === 176 ||
      data.current.weather_code === 353 ||
      data.current.weather_code === 356 ||
      data.current.weather_code === 359
    ) {
      document.getElementById(`hr2-partly-cloudy`).style.display = `block`;
    }
    ////////////////
    /////HOUR 3/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr3-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && time < 20 && time > 6) {
      document.getElementById(`hr3-sunny`).style.display = `block`;
    } else if (
      (data.current.weather_code === 113 && time > 20) ||
      (data.current.weather_code === 113 && time < 7)
    ) {
      document.getElementById(`hr3-clear-night`).style.display = `block`;
    } else if (
      data.current.weather_code === 200 ||
      data.current.weather_code === 386 ||
      data.current.weather_code === 389
    ) {
      document.getElementById(
        `hr3-thunderstorm-with-rain`
      ).style.display = `block`;
    } else if (data.current.weather_code === 200) {
      document.getElementById(`hr3-thunderstorm`).style.display = `block`;
    } else if (
      data.current.weather_code === 227 ||
      data.current.weather_code === 230 ||
      data.current.weather_code === 323 ||
      data.current.weather_code === 326 ||
      data.current.weather_code === 329 ||
      data.current.weather_code === 332 ||
      data.current.weather_code === 335 ||
      data.current.weather_code === 338 ||
      data.current.weather_code === 368 ||
      data.current.weather_code === 371
    ) {
      document.getElementById(`hr3-snow`).style.display = `block`;
    } else if (
      data.current.weather_code === 266 ||
      data.current.weather_code === 296 ||
      data.current.weather_code === 299 ||
      data.current.weather_code === 302 ||
      data.current.weather_code === 305 ||
      data.current.weather_code === 308
    ) {
      document.getElementById(`hr3-rain`).style.display = `block`;
    } else if (
      data.current.weather_code === 116 ||
      data.current.weather_code === 119 ||
      data.current.weather_code === 176 ||
      data.current.weather_code === 353 ||
      data.current.weather_code === 356 ||
      data.current.weather_code === 359
    ) {
      document.getElementById(`hr3-partly-cloudy`).style.display = `block`;
    }
  },
  searchWeather: function () {
    document.querySelectorAll(`.forecast-icon`).forEach((entries) => {
      entries.style.display = `none`;
    });
    this.fetchWeather(document.getElementById(`search`).value);
  },
};

document.getElementById(`search`).addEventListener(`keypress`, (e) => {
  if (e.key === `Enter`) {
    weather.searchWeather();
  }
});

let weatherBackground = document.querySelector(`.element-container`);
let foregroundHill = document.getElementById(`hill-foreground-fill`);
let middleHill = document.getElementById(`hill-middle-fill`);
let backgroundHill = document.getElementById(`hill-background-fill`);
let fog = document.getElementById(`fog`);
let moon = document.getElementById(`moon`);
let moonGlow = document.getElementById(`moon-glow`);
let sun = document.getElementById(`sun`);
let sunGlow = document.getElementById(`sun-glow`);
let sunset = document.getElementById(`sunset`);
let sunsetGlow = document.getElementById(`sunset-glow`);
let cloudGlow = document.getElementById(`cloud-glow`);
// let city = document.querySelector(`.city`);
let displayDate = document.querySelectorAll(`.date`);

//////////////////////////////////////////////////////////////
//DAY OF WEEK CHANGES///////////////////////////////////////////////////////////////////////////////////////////////////////

let dayOfWeek = document.getElementById(`day`);
let day = d.getDay();

switch (day) {
  case 0:
    day = `SUNDAY`;
    break;
  case 1:
    day = `MONDAY`;
    break;
  case 2:
    day = `TUESDAY`;
    break;
  case 3:
    day = `WEDNESDAY`;
    break;
  case 4:
    day = `THURSDAY`;
    break;
  case 5:
    day = `FRIDAY`;
    break;
  case 6:
    day = `SATURDAY`;
    break;
}

dayOfWeek.innerHTML = day;

//////////////////////////////////////////////////////////////
//MONTH CHANGES/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let displayMonth = document.getElementById(`month`);
let month = d.getMonth();

switch (month) {
  case 0:
    month = `JANUARY`;
    break;
  case 1:
    month = `FEBRUARY`;
    break;
  case 2:
    month = `MARCH`;
    break;
  case 3:
    month = `APRIL`;
    break;
  case 4:
    month = `MAY`;
    break;
  case 5:
    month = `JUNE`;
    break;
  case 6:
    month = `JULY`;
    break;
  case 7:
    month = `AUGUST`;
    break;
  case 8:
    month = `SEPTEMBER`;
    break;
  case 9:
    month = `OCTOBER`;
    break;
  case 10:
    month = `NOVEMBER`;
    break;
  case 11:
    month = `DECEMBER`;
    break;
}

displayMonth.innerHTML = month + `&nbsp;`;

//////////////////////////////////////////////////////////////
//MONTH CHANGES/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let displayDay = document.getElementById(`day-of-month`);
let dayOfMonth = d.getDate();

const getDayEnding = function (dayNumber) {
  let dayEnding;
  if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
    dayEnding = `st`;
  } else if (dayNumber === 2 || dayNumber === 22) {
    dayEnding = `nd`;
  } else if (dayNumber === 3 || dayNumber === 23) {
    dayEnding = `rd`;
  } else {
    dayEnding = `th`;
  }

  return dayEnding;
};
// console.log(dayOfMonth);
// console.log(getDayEnding(dayOfMonth));
let dayEnding = getDayEnding(dayOfMonth);
displayDay.innerHTML = dayOfMonth + `${dayEnding}`;

//////////////////////////////////////////////////////////////
//TIME OF DAY ANIMATION CHANGES/////////////////////////////////////////////////////////////////////////////////////////////

if (time > 19 || time < 6) {
  weatherBackground.style.background = `linear-gradient(to bottom, #116687, rgba(13, 69, 102, 0))`;
  foregroundHill.style.fill = `#518689`;
  middleHill.style.fill = `#63AEB2`;
  backgroundHill.style.fill = `#7BBBBF`;
  sun.style.display = `none`;
  sunGlow.style.display = `none`;
  cloudGlow.style.display = `block`;
  moon.style.display = `block`;
  moonGlow.style.display = `block`;
  fog.style.display = `block`;
  currentCity.style.color = `white`;
  displayDate.forEach((entries) => {
    entries.style.color = `white`;
  });
} else if (time === 6 || time === 19) {
  weatherBackground.style.background = `linear-gradient(to bottom, #f7e5a5, #fff8d2)`;
  sun.style.display = `none`;
  sunGlow.style.display = `none`;
  sunset.style.display = `block`;
  sunsetGlow.style.display = `block`;
  cloudGlow.style.display = `block`;
  foregroundHill.style.fill = `#CDE088`;
  middleHill.style.fill = `#DBEAA1`;
  backgroundHill.style.fill = `#EBF4AF`;
} else {
  weatherBackground.style.background = `#fff8d2`;
}
