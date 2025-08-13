function showCityElement(response) {
  console.log(response.data);
  let searchCity = document.querySelector("#city");
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  console.log(`Coordinates:${lat},${lon}`);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let dateElement = document.querySelector("#day");
  let dt = response.data.dt;
  let timezone = response.data.timezone;
  let date = new Date((dt + timezone) * 1000);

  searchCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.innerHTML = `<img src="${iconUrl}"/>`;
  dateElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let hour = date.getUTCHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getUTCDay()];

  return `${day} ${hour}:${minute}`;
}

function displayCity(city) {
  let apiKey = "d1193959d2d841ec7555416d715716a6";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityElement);
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", searchForCity);

displayCity("Perth");
