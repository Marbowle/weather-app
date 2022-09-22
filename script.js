let time = document.querySelector("#time");
let date = new Date();
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}`;
let day = document.querySelector("#day");
let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let days = dayName[date.getDay()];
let data = date.getDate();
let months = [
  "Januray",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];
day.innerHTML = `${days}, ${data} ${month}`;

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function search(city) {
  let apiKey = "85f30c950aad74b0daa3f0ac2c123393";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showPosition(position) {
  let apiKey = "85f30c950aad74b0daa3f0ac2c123393";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);
let currentPosition = document.querySelector(".currentPosition");
currentPosition.addEventListener("click", showPosition);

function currentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search").value;
  search(cityInput);
}
let locationInput = document.querySelector("#locationInput");
locationInput.addEventListener("submit", currentCity);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="weatherAfter">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <li>
      <span class="weather-forecast-date">${forecastDate(forecastDay.dt)}</span>
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}&#176;</span>
    </li>
  `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(corrdinates) {
  console.log(corrdinates);
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${corrdinates.lat}&lon=${corrdinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let findName = response.data.name;
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${findName}`;
  let anotherDays = document.querySelector("#changeCity");
  anotherDays.innerHTML = `Another days in ${findName}`;
  let temperatureCity = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperatureCity}&#176;C`;
  let cloudy = response.data.clouds.all;
  let cloud = document.querySelector("#cloud");
  cloud.innerHTML = `${cloudy} %`;
  let humidityCurrent = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityCurrent} %`;
  let windSpeed = response.data.wind.speed;
  let windChange = Math.round(3.6 * windSpeed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windChange} km/h`;
  let weatherDescription = response.data.weather[0].description;
  let pressureCurrent = document.querySelector("#pressure");
  pressureCurrent.innerHTML = `${response.data.main.pressure} hPa`;
  let currentTempMax = document.querySelector("#maxTemp");
  let maxTemp = Math.round(response.data.main.temp_max);
  currentTempMax.innerHTML = `${maxTemp} &#176;C`;
  let currentTempMin = document.querySelector("#minTemp");
  let minTemp = Math.round(response.data.main.temp_min);
  currentTempMin.innerHTML = `${minTemp} &#176;C`;
  let codnition = document.querySelector("#condition");
  codnition.innerHTML = `${weatherDescription}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", weatherDescription);
  getForecast(response.data.coord);
}

displayForecast();
search("Stockholm");
