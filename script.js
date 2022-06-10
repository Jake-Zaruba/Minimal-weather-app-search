// "use strict";
////////////////////////
/////SERVICE WORKER/////
////////////////////////
let downloadBtn = document.querySelector(`.download`);
if (navigator.serviceWorker) {
  window.addEventListener(`load`, () => {
    navigator.serviceWorker
      .register(`../sw-cached-site.js`)
      .then((reg) => console.log())
      .catch((err) => console.log(`Service worker error: ${err}`));
  });

  let deferredPrompt;
  window.addEventListener(`beforeinstallprompt`, (e) => {
    e.preventDefault();
    deferredPrompt = e;
    downloadBtn.style.display = `block`;
    downloadBtn.addEventListener(`click`, (e) => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === `accepted`) {
          console.log(`User accepted the A2HS prompt`);
        }
        deferredPrompt = null;
      });
    });
  });
}

const downloadTimeout = setTimeout(() => {
  downloadBtn.classList.add(`hide`);
}, 10000);

////////////////////////////////
/////PWA INSTALL PERMISSION/////
////////////////////////////////

//////////////////////////////
/////FORECAST BY LOCATION/////
//////////////////////////////

/////Current Weather/////
let d = new Date();
console.log(d);
let weatherDay = d.getDate();
if (weatherDay === 1) {
  weatherDay = `01`;
} else if (weatherDay === 2) {
  weatherDay = `02`;
} else if (weatherDay === 3) {
  weatherDay = `03`;
} else if (weatherDay === 4) {
  weatherDay = `04`;
} else if (weatherDay === 5) {
  weatherDay = `05`;
} else if (weatherDay === 6) {
  weatherDay = `06`;
} else if (weatherDay === 7) {
  weatherDay = `07`;
} else if (weatherDay === 8) {
  weatherDay = `08`;
} else if (weatherDay === 9) {
  weatherDay = `09`;
}

let weatherMonth = d.getMonth() + 1;
if (weatherMonth === 1) {
  weatherMonth = `01`;
} else if (weatherMonth === 2) {
  weatherMonth = `02`;
} else if (weatherMonth === 3) {
  weatherMonth = `03`;
} else if (weatherMonth === 4) {
  weatherMonth = `04`;
} else if (weatherMonth === 5) {
  weatherMonth = `05`;
} else if (weatherMonth === 6) {
  weatherMonth = `06`;
} else if (weatherMonth === 7) {
  weatherMonth = `07`;
} else if (weatherMonth === 8) {
  weatherMonth = `08`;
} else if (weatherMonth === 9) {
  weatherMonth = `09`;
}

let weatherYear = d.getFullYear();
let currentWeatherDate = weatherYear + `-` + weatherMonth + `-` + weatherDay;
const time = d.getHours();
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
/////ADVANCED DATA/////
let feelsLike = document.getElementById(`feels-like`);
let highLow = document.getElementById(`high-low`);
let humidity = document.getElementById(`humidity`);
let windSpeed = document.getElementById(`wind-speed`);
let sunriseTime = document.getElementById(`sunrise-time`);
let sunsetTime = document.getElementById(`sunset-time`);
let lon;
let lat;

/////FETCH & DISPLAY/////

document.querySelector(`.location-icon`).addEventListener(`click`, () => {
  document.querySelectorAll(`.forecast-icon`).forEach((entries) => {
    entries.style.display = `none`;
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      fetch(
        `https://api.weatherstack.com/forecast?access_key=47cb91ecea50bb023ceb3a6023f2b4f1&query=${lat},${lon}&forecast_days=1&hourly=1&interval=1&units=f`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.querySelectorAll(`.loading`).forEach((entries) => {
            entries.classList.remove(`loading`);
          });

          currentCity.innerHTML = data.location.name;
          let currentLocation = data.location.name;
          let temp = data.current.temperature;
          let forecastTime = d.getHours();
          /////MAIN DISPLAY/////
          document.getElementById(`search`).value = currentLocation;
          currentTemp.innerHTML = `&nbsp;` + temp + `&deg;`;

          let formatForecastTime = function (hour) {
            if (hour === 24) {
              return 0;
            } else if (hour === 25) {
              return 1;
            } else if (hour === 26) {
              return 2;
            } else {
              return hour;
            }
          };

          let nowTemp = data.current.temperature;
          let hr1Time = formatForecastTime(time + 1);
          let hr2Time = formatForecastTime(time + 2);
          let hr3Time = formatForecastTime(time + 3);
          console.log(currentWeatherDate);
          let hr1Temp =
            data.forecast[currentWeatherDate].hourly[hr1Time].temperature;

          let hr2Temp =
            data.forecast[currentWeatherDate].hourly[hr2Time].temperature;

          let hr3Temp =
            data.forecast[currentWeatherDate].hourly[hr3Time].temperature;

          // //////////////////////////////////////
          // /////TESTING MY TIME FUNCTION/////////
          // //////////////////////////////////////

          // let theTime1 = data.forecast[currentWeatherDate].hourly[1].time;
          // console.log(time + 2);
          // console.log(formatForecastTime(time) + 3);
          // console.log(theTime1);

          /////////////////////////////////////////////////////
          /////IT FINALLY WORKS LOL TIME TO UPDATE THE APP/////
          /////////////////////////////////////////////////////
          now.innerHTML = `&nbsp;` + nowTemp + `&deg;`;
          hr1.innerHTML = `&nbsp;` + hr1Temp + `&deg;`;
          hr2.innerHTML = `&nbsp;` + hr2Temp + `&deg;`;
          hr3.innerHTML = `&nbsp;` + hr3Temp + `&deg;`;

          ////////////////////////
          /////FORECAST HOURS/////
          ////////////////////////

          let forecastHr1 = forecastTime + 1;
          let forecastHr2 = forecastTime + 2;
          let forecastHr3 = forecastTime + 3;
          /////FORMAT TO STANDARD TIME/////
          const formatTime = function (hour) {
            if (hour === 1) {
              return `1am`;
            } else if (hour === 2) {
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
            } else if (hour === 0) {
              return `12am`;
            } else if (hour === 24) {
              return `12am`;
            } else if (hour === 25) {
              return `1am`;
            } else if (hour === 26) {
              return `2am`;
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

          let isDay;

          if (time < 20 && time > 5) {
            isDay = true;
          } else if (time > 20 || time < 6) {
            isDay = false;
          }

          //////////////////////
          /////CURRENT HOUR/////
          //////////////////////

          if (data.current.weather_code === 122) {
            document.getElementById(`hr0-cloudy`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === true) {
            document.getElementById(`hr0-sunny`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === false) {
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
            data.current.weather_code === 308 ||
            data.current.weather_code === 362
          ) {
            document.getElementById(`hr0-rain`).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === true) ||
            (data.current.weather_code === 119 && isDay === true) ||
            (data.current.weather_code === 176 && isDay === true) ||
            (data.current.weather_code === 353 && isDay === true) ||
            (data.current.weather_code === 356 && isDay === true) ||
            (data.current.weather_code === 359 && isDay === true)
          ) {
            document.getElementById(
              `hr0-partly-cloudy`
            ).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === false) ||
            (data.current.weather_code === 119 && isDay === false) ||
            (data.current.weather_code === 176 && isDay === false) ||
            (data.current.weather_code === 353 && isDay === false) ||
            (data.current.weather_code === 356 && isDay === false) ||
            (data.current.weather_code === 359 && isDay === false)
          ) {
            document.getElementById(
              `hr0-partly-cloudy-night`
            ).style.display = `block`;
          }
          ////////////////
          /////HOUR 1/////
          ////////////////
          if (data.current.weather_code === 122) {
            document.getElementById(`hr1-cloudy`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === true) {
            document.getElementById(`hr1-sunny`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === false) {
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
            data.current.weather_code === 308 ||
            data.current.weather_code === 362
          ) {
            document.getElementById(`hr1-rain`).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === true) ||
            (data.current.weather_code === 119 && isDay === true) ||
            (data.current.weather_code === 176 && isDay === true) ||
            (data.current.weather_code === 353 && isDay === true) ||
            (data.current.weather_code === 356 && isDay === true) ||
            (data.current.weather_code === 359 && isDay === true)
          ) {
            document.getElementById(
              `hr1-partly-cloudy`
            ).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === false) ||
            (data.current.weather_code === 119 && isDay === false) ||
            (data.current.weather_code === 176 && isDay === false) ||
            (data.current.weather_code === 353 && isDay === false) ||
            (data.current.weather_code === 356 && isDay === false) ||
            (data.current.weather_code === 359 && isDay === false)
          ) {
            document.getElementById(
              `hr1-partly-cloudy-night`
            ).style.display = `block`;
          }
          ////////////////
          /////HOUR 2/////
          ////////////////
          if (data.current.weather_code === 122) {
            document.getElementById(`hr2-cloudy`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === true) {
            document.getElementById(`hr2-sunny`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === false) {
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
            data.current.weather_code === 308 ||
            data.current.weather_code === 362
          ) {
            document.getElementById(`hr2-rain`).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === true) ||
            (data.current.weather_code === 119 && isDay === true) ||
            (data.current.weather_code === 176 && isDay === true) ||
            (data.current.weather_code === 353 && isDay === true) ||
            (data.current.weather_code === 356 && isDay === true) ||
            (data.current.weather_code === 359 && isDay === true)
          ) {
            document.getElementById(
              `hr2-partly-cloudy`
            ).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === false) ||
            (data.current.weather_code === 119 && isDay === false) ||
            (data.current.weather_code === 176 && isDay === false) ||
            (data.current.weather_code === 353 && isDay === false) ||
            (data.current.weather_code === 356 && isDay === false) ||
            (data.current.weather_code === 359 && isDay === false)
          ) {
            document.getElementById(
              `hr2-partly-cloudy-night`
            ).style.display = `block`;
          }
          ////////////////
          /////HOUR 3/////
          ////////////////
          if (data.current.weather_code === 122) {
            document.getElementById(`hr3-cloudy`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === true) {
            document.getElementById(`hr3-sunny`).style.display = `block`;
          } else if (data.current.weather_code === 113 && isDay === false) {
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
            data.current.weather_code === 308 ||
            data.current.weather_code === 362
          ) {
            document.getElementById(`hr3-rain`).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === true) ||
            (data.current.weather_code === 119 && isDay === true) ||
            (data.current.weather_code === 176 && isDay === true) ||
            (data.current.weather_code === 353 && isDay === true) ||
            (data.current.weather_code === 356 && isDay === true) ||
            (data.current.weather_code === 359 && isDay === true)
          ) {
            document.getElementById(
              `hr3-partly-cloudy`
            ).style.display = `block`;
          } else if (
            (data.current.weather_code === 116 && isDay === false) ||
            (data.current.weather_code === 119 && isDay === false) ||
            (data.current.weather_code === 176 && isDay === false) ||
            (data.current.weather_code === 353 && isDay === false) ||
            (data.current.weather_code === 356 && isDay === false) ||
            (data.current.weather_code === 359 && isDay === false)
          ) {
            document.getElementById(
              `hr3-partly-cloudy-night`
            ).style.display = `block`;
          }
          //////////////////////////
          /////ADVANCED DISPLAY/////
          //////////////////////////
          feelsLike.innerHTML = `&nbsp;` + data.current.feelslike + `&deg;`;
          highLow.innerHTML =
            data.forecast[currentWeatherDate].maxtemp +
            `&deg;` +
            `/` +
            data.forecast[currentWeatherDate].mintemp +
            `&deg;`;
          humidity.innerHTML = `&nbsp;` + data.current.humidity + `%`;
          windSpeed.innerHTML = data.current.wind_speed + ` mph`;
          sunriseTime.innerHTML =
            data.forecast[currentWeatherDate].astro.sunrise;
          sunsetTime.innerHTML = data.forecast[currentWeatherDate].astro.sunset;
        });
    });
  } else {
    document.querySelector(`.city`).textContent = `Location Off`;
  }
});
////////////////////////////
/////FORECAST BY SEARCH/////
////////////////////////////

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

    let formatForecastTime = function (hour) {
      if (hour === 24) {
        return 0;
      } else if (hour === 25) {
        return 1;
      } else if (hour === 26) {
        return 2;
      } else {
        return hour;
      }
    };

    let nowTemp = data.current.temperature;
    let hr1Time = formatForecastTime(time + 1);
    let hr2Time = formatForecastTime(time + 2);
    let hr3Time = formatForecastTime(time + 3);

    let hr1Temp = data.forecast[currentWeatherDate].hourly[hr1Time].temperature;

    let hr2Temp = data.forecast[currentWeatherDate].hourly[hr2Time].temperature;

    let hr3Temp = data.forecast[currentWeatherDate].hourly[hr3Time].temperature;
    now.innerHTML = `&nbsp;` + nowTemp + `&deg;`;
    hr1.innerHTML = `&nbsp;` + hr1Temp + `&deg;`;
    hr2.innerHTML = `&nbsp;` + hr2Temp + `&deg;`;
    hr3.innerHTML = `&nbsp;` + hr3Temp + `&deg;`;

    /////FORECAST HOURS/////

    let forecastHr1 = forecastTime + 1;
    let forecastHr2 = forecastTime + 2;
    let forecastHr3 = forecastTime + 3;
    /////FORMAT TO STANDARD TIME/////
    const formatTime = function (hour) {
      if (hour === 1) {
        return `1am`;
      } else if (hour === 2) {
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
      } else if (hour === 0) {
        return `12am`;
      } else if (hour === 24) {
        return `12am`;
      } else if (hour === 25) {
        return `1am`;
      } else if (hour === 26) {
        return `2am`;
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

    let isDay;

    if (time < 20 && time > 5) {
      isDay = true;
    } else if (time > 20 || time < 6) {
      isDay = false;
    }

    /////CURRENT HOUR/////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr0-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === true) {
      document.getElementById(`hr0-sunny`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === false) {
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
      data.current.weather_code === 308 ||
      data.current.weather_code === 362
    ) {
      document.getElementById(`hr0-rain`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === true) ||
      (data.current.weather_code === 119 && isDay === true) ||
      (data.current.weather_code === 176 && isDay === true) ||
      (data.current.weather_code === 353 && isDay === true) ||
      (data.current.weather_code === 356 && isDay === true) ||
      (data.current.weather_code === 359 && isDay === true)
    ) {
      document.getElementById(`hr0-partly-cloudy`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === false) ||
      (data.current.weather_code === 119 && isDay === false) ||
      (data.current.weather_code === 176 && isDay === false) ||
      (data.current.weather_code === 353 && isDay === false) ||
      (data.current.weather_code === 356 && isDay === false) ||
      (data.current.weather_code === 359 && isDay === false)
    ) {
      document.getElementById(
        `hr0-partly-cloudy-night`
      ).style.display = `block`;
    }
    ////////////////
    /////HOUR 1/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr1-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === true) {
      document.getElementById(`hr1-sunny`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === false) {
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
      data.current.weather_code === 308 ||
      data.current.weather_code === 362
    ) {
      document.getElementById(`hr1-rain`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === true) ||
      (data.current.weather_code === 119 && isDay === true) ||
      (data.current.weather_code === 176 && isDay === true) ||
      (data.current.weather_code === 353 && isDay === true) ||
      (data.current.weather_code === 356 && isDay === true) ||
      (data.current.weather_code === 359 && isDay === true)
    ) {
      document.getElementById(`hr1-partly-cloudy`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === false) ||
      (data.current.weather_code === 119 && isDay === false) ||
      (data.current.weather_code === 176 && isDay === false) ||
      (data.current.weather_code === 353 && isDay === false) ||
      (data.current.weather_code === 356 && isDay === false) ||
      (data.current.weather_code === 359 && isDay === false)
    ) {
      document.getElementById(
        `hr1-partly-cloudy-night`
      ).style.display = `block`;
    }
    ////////////////
    /////HOUR 2/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr2-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === true) {
      document.getElementById(`hr2-sunny`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === false) {
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
      data.current.weather_code === 308 ||
      data.current.weather_code === 362
    ) {
      document.getElementById(`hr2-rain`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === true) ||
      (data.current.weather_code === 119 && isDay === true) ||
      (data.current.weather_code === 176 && isDay === true) ||
      (data.current.weather_code === 353 && isDay === true) ||
      (data.current.weather_code === 356 && isDay === true) ||
      (data.current.weather_code === 359 && isDay === true)
    ) {
      document.getElementById(`hr2-partly-cloudy`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === false) ||
      (data.current.weather_code === 119 && isDay === false) ||
      (data.current.weather_code === 176 && isDay === false) ||
      (data.current.weather_code === 353 && isDay === false) ||
      (data.current.weather_code === 356 && isDay === false) ||
      (data.current.weather_code === 359 && isDay === false)
    ) {
      document.getElementById(
        `hr2-partly-cloudy-night`
      ).style.display = `block`;
    }
    ////////////////
    /////HOUR 3/////
    ////////////////
    if (data.current.weather_code === 122) {
      document.getElementById(`hr3-cloudy`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === true) {
      document.getElementById(`hr3-sunny`).style.display = `block`;
    } else if (data.current.weather_code === 113 && isDay === false) {
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
      data.current.weather_code === 308 ||
      data.current.weather_code === 362
    ) {
      document.getElementById(`hr3-rain`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === true) ||
      (data.current.weather_code === 119 && isDay === true) ||
      (data.current.weather_code === 176 && isDay === true) ||
      (data.current.weather_code === 353 && isDay === true) ||
      (data.current.weather_code === 356 && isDay === true) ||
      (data.current.weather_code === 359 && isDay === true)
    ) {
      document.getElementById(`hr3-partly-cloudy`).style.display = `block`;
    } else if (
      (data.current.weather_code === 116 && isDay === false) ||
      (data.current.weather_code === 119 && isDay === false) ||
      (data.current.weather_code === 176 && isDay === false) ||
      (data.current.weather_code === 353 && isDay === false) ||
      (data.current.weather_code === 356 && isDay === false) ||
      (data.current.weather_code === 359 && isDay === false)
    ) {
      document.getElementById(
        `hr3-partly-cloudy-night`
      ).style.display = `block`;
    }
    feelsLike.innerHTML = `&nbsp;` + data.current.feelslike + `&deg;`;
    highLow.innerHTML =
      data.forecast[currentWeatherDate].maxtemp +
      `&deg;` +
      `/` +
      data.forecast[currentWeatherDate].mintemp +
      `&deg;`;
    humidity.innerHTML = data.current.humidity + `%`;
    windSpeed.innerHTML = data.current.wind_speed + ` mph`;
    sunriseTime.innerHTML = data.forecast[currentWeatherDate].astro.sunrise;
    sunsetTime.innerHTML = data.forecast[currentWeatherDate].astro.sunset;
    document.querySelectorAll(`.loading`).forEach((entries) => {
      entries.classList.remove(`loading`);
    });
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
    window.scrollTo({ top: 0, behavior: `smooth` });
  }
});

document.querySelector(`.search-icon`).addEventListener(`click`, () => {
  weather.searchWeather();
  window.scrollTo({ top: 0, behavior: `smooth` });
});

document.querySelector(`.options`).addEventListener(`click`, () => {
  window.scrollTo({ top: 1000, behavior: `smooth` });
});

let weatherBackground = document.querySelector(`.element-container`);
let foregroundHill = document.getElementById(`hill-foreground-fill`);
let middleHill = document.getElementById(`hill-middle-fill`);
let backgroundHill = document.getElementById(`hill-background-fill`);
let options = document.querySelector(`.options`);
let closeIcon = document.querySelector(`.close-icon`);
let bumpout = document.getElementById(`forecast-bumpout`);
let fog = document.getElementById(`fog`);
let moon = document.getElementById(`moon`);
let stars = document.getElementById(`stars`);
let moonGlow = document.getElementById(`moon-glow`);
let sun = document.getElementById(`sun`);
let sunGlow = document.getElementById(`sun-glow`);
let sunset = document.getElementById(`sunset`);
let sunsetGlow = document.getElementById(`sunset-glow`);
let cloudGlow = document.getElementById(`cloud-glow`);
let displayDate = document.querySelectorAll(`.date`);

/////////////////////////////
/////DAY OF WEEK CHANGES/////
/////////////////////////////

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
//MONTH CHANGES///////////////////////////////////////////////
//////////////////////////////////////////////////////////////

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
let dayEnding = getDayEnding(dayOfMonth);
displayDay.innerHTML = dayOfMonth + `${dayEnding}`;

//////////////////////////////////////////////////////////////
//SHOW || HIDE ADVANCED DISPLAY///////////////////////////////
//////////////////////////////////////////////////////////////

document.querySelector(`.options`).addEventListener(`click`, () => {
  document.querySelector(`.advanced-container`).classList.toggle(`show`);
  document.getElementById(`forecast-box`).classList.toggle(`show-advanced`);
  document.getElementById(`hill-foreground`).classList.toggle(`hide-hills`);
  document.getElementById(`hill-middle`).classList.toggle(`hide-hills`);
  // bumpout.classList.toggle(`show`);
  closeIcon.classList.toggle(`show`);
});

closeIcon.addEventListener(`click`, () => {
  closeIcon.classList.remove(`show`);
  // bumpout.classList.remove(`show`);
  document.querySelector(`.advanced-container`).classList.remove(`show`);
  document.getElementById(`forecast-box`).classList.remove(`show-advanced`);
  document.getElementById(`hill-foreground`).classList.remove(`hide-hills`);
  document.getElementById(`hill-middle`).classList.remove(`hide-hills`);
});

//////////////////////////////////////////////////////////////
//TIME OF DAY ANIMATION CHANGES///////////////////////////////
//////////////////////////////////////////////////////////////

if (time > 19 || time < 6) {
  weatherBackground.style.background = `linear-gradient(to bottom, #116687, rgba(13, 69, 102, 0))`;
  foregroundHill.style.fill = `#518689`;
  middleHill.style.fill = `#63AEB2`;
  backgroundHill.style.fill = `#7BBBBF`;
  sun.style.display = `none`;
  sunGlow.style.display = `none`;
  options.style.stroke = `white`;
  closeIcon.style.stroke = `white`;
  downloadBtn.style.stroke = `white`;
  cloudGlow.style.display = `block`;
  stars.style.display = `block`;
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
