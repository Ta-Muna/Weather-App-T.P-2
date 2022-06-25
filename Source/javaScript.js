// Day and Time

function formatDate(date) {
  let hour = date.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursay`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[dayIndex];
  return `${day}, ${hour}:${minutes}`;
}

let currentDayAndTime = document.querySelector(`#current-day-time`);
let now = new Date();

currentDayAndTime.innerHTML = formatDate(now);

// Description
function showNewTemperatureAndDescription(response) {
  document.querySelector(`#currentCity`).innerHTML = response.data.name;
  document.querySelector(`#temperature-Now`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector(`#icon`);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;
}

// Search Engine
function findCity(city) {
  let apiKey = `434de5eada78e8cca4747491478592c5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showNewTemperatureAndDescription);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector(`#exampleDataList`).value;
  findCity(cityElement);
}

function searchLocation(position) {
  let apiKey = `434de5eada78e8cca4747491478592c5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showNewTemperatureAndDescription);
}

// Current

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// lets

let searchForm = document.querySelector(`#city-search`);
searchForm.addEventListener(`submit`, handleSubmit);

let currentButton = document.querySelector(`#current`);
currentButton.addEventListener(`click`, getCurrentLocation);

findCity(`Tbilisi`);

// Celsius and Fahrenheit
function temperatureConversionToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(`.current-temperature`);

  celsiusDegree.classList.remove("active");
  fahrenheitDegree.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitDegree = document.querySelector(`#fahrenheit`);
fahrenheitDegree.addEventListener(`click`, temperatureConversionToFahrenheit);

function backConversionToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(`.current-temperature`);
  celsiusDegree.classList.add("active");
  fahrenheitDegree.classList.remove("active");
  celsius.innerHTML = Math.round(celsiusTemperature);
}
let celsiusDegree = document.querySelector(`#celsius`);
celsiusDegree.addEventListener(`click`, backConversionToCelsius);
