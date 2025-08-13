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

  searchCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.innerHTML = `<img src="${iconUrl}"/>`;
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
