// API - openweathermap.org
//example url: https://api.openweathermap.org/data/2.5/weather?q=London&appid=2616ade7f0d69289c6bed6ea80b29011
const API_KEY = "2616ade7f0d69289c6bed6ea80b29011";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`;

const search = document.getElementById("search");
const form = document.querySelector("form");
const main = document.querySelector("main");

async function GetWeatherByLocation(location) {
  const response = await fetch(GetURL(location));
  const responseData = await response.json();

  DisplayWeather(responseData);
  console.log(responseData);
  console.log(responseData.main.temp);
  console.log("To Celsius : ", KelvinToCelsius(responseData.main.temp));
}

// GetWeatherByLocation("Edmonton");

function GetURL(location) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
}

function KelvinToCelsius(k) {
  return (k - 273.15).toFixed(1);
}

function DisplayWeather(data) {
  main.innerHTML = "";

  const temp = KelvinToCelsius(data.main.temp);
  const weather = document.createElement("div");

  weather.classList.add("weather");
  weather.innerHTML = `
   <p>It is currently</p>
   <h2>${temp}°C</h2>
   <p>in ${data.name}</p>
   <div class="description">
   <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'></img>
   <small>${data.weather[0].main}</small>
   </div>
   `;
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchInput = search.value;

  if (searchInput) {
    GetWeatherByLocation(searchInput);
  }
  console.log(searchInput);
});
