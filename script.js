document.onload = getWeather('Nottingham'); 

const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keypress', searchWeather);

function searchWeather(e) {
  if (e.keyCode == 13) {
    getWeather(searchBar.value);
  }
}

let testing = secrets.SECRET_KEY;

function getWeather(q) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=716200b8cb430fa6c3a66c3fe6eb357d`)
    .then(w_data => {
      return w_data.json();
    }).then(displayResults);
}

function displayResults (weather) {
  if (weather.sys == undefined) {
    alert('City does not exist. Please enter a valid name and try again.');
    return;
  }

  let city = document.querySelector('.display .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let rightNow = new Date();
  let date = document.querySelector('.display .date');
  date.innerText = dateGenerator(rightNow);

  let temperature = document.querySelector('.data .temperature');
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_element = document.querySelector('.data .weather');
  weather_element.innerText = weather.weather[0].main;

  let highLow = document.querySelector('.high-low');
  highLow.innerText = `H/L: ${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateGenerator (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} ${month} ${year}`;
}