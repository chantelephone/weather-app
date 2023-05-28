//Notes from HTML
//class="weekday" taken drom div with id "todays-date"

//Date Java
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
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

let now = new Date();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let date = now.getDate();
let day = days[now.getDay()];
let month = now.getMonth();

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day} | ${hour}:${minute}`;

//Search Bar

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchBar);

function searchBar(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "44b0o7f8fab0527e4faa33t62cd1fcc3";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentConditions);
}

//Test comment

//C and F Links Java
//Celsius

let tempMain = document.querySelector(".tempMain");

function unitCelsius(event) {
  event.preventDefault();
  tempMain.innerHTML = `20°`;
}

let celsius = document.querySelector("#celsius-temp");
celsius.addEventListener("click", unitCelsius);

//Farenheit

function unitFarenheit(event) {
  event.preventDefault();
  tempMain.innerHTML = `66°`;
}

let farenheit = document.querySelector("#farenheit-temp");
farenheit.addEventListener("click", unitFarenheit);

//Currrent Button

let currentConditions = document.querySelector("#current-conditions");
currentConditions.addEventListener("click", currentButton);

function currentButton(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "44b0o7f8fab0527e4faa33t62cd1fcc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCurrentConditions);
}
//Current button functions cont'd, also starting from search input...
function showCurrentConditions(response) {
  let cityHeading = document.querySelector("#input-city");
  cityHeading.innerHTML = response.data.city;

  let temperature = Math.round(response.data.temperature.current);
  let headingTemp = document.querySelector(".tempMain");
  headingTemp.innerHTML = `${temperature}°`;

  let weatherIcon = document.querySelector("#weather-icon");

  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  weatherIcon.setAttribute(
    "src",
    `https://api.shecodes.io/img/v1/current?query=${response.data.condition.icon_url}`
    //CHeck
  );
}
